"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAgentById } from "@/lib/agents";
import styles from "./agent.module.css";

export default function AgentPage({ params }) {
  const agent = getAgentById(params.id);
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!agent) {
    return (
      <div className={styles.notFound}>
        <p>Agent introuvable</p>
        <button onClick={() => router.push("/")}>← Retour</button>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.id, messages: newMessages }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: text }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "❌ Erreur de connexion. Vérifiez votre clé API." }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.push("/")}>← Retour</button>
        <div className={styles.agentInfo}>
          <div className={styles.headerAvatar}>{agent.emoji}</div>
          <div>
            <div className={styles.headerName}>{agent.name}</div>
            <div className={styles.headerRole} style={{ color: agent.color }}>{agent.role}</div>
          </div>
        </div>
        <div className={styles.onlineChip}>
          <div className={styles.onlineDot} />
          En ligne
        </div>
      </header>

      {/* Chat */}
      <div className={styles.chat}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <div className={styles.welcomeAvatar}>{agent.emoji}</div>
            <h2 className={styles.welcomeName}>Bonjour, je suis {agent.name}</h2>
            <p className={styles.welcomeDesc}>{agent.desc}</p>
            <p className={styles.welcomeSub}>Comment puis-je vous aider aujourd'hui ?</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`${styles.msg} ${msg.role === "user" ? styles.user : styles.assistant}`}>
            {msg.role === "assistant" && (
              <div className={styles.msgAvatar}>{agent.emoji}</div>
            )}
            <div className={styles.bubble}>
              {msg.content || (loading && i === messages.length - 1 && (
                <span className={styles.typing}>
                  <span /><span /><span />
                </span>
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Parlez à ${agent.name}...`}
          rows={1}
          disabled={loading}
        />
        <button
          className={styles.sendBtn}
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          style={{ borderColor: agent.color, color: agent.color }}
        >
          Envoyer →
        </button>
      </div>
    </div>
  );
}
