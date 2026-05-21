"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { agents } from "@/lib/agents";
import styles from "./page.module.css";

const stats = [
  { icon: "🤖", num: "8", label: "Agents actifs", sub: "● En ligne" },
  { icon: "📈", num: "247", label: "Tâches aujourd'hui", sub: "+12% vs hier" },
  { icon: "⏱", num: "128h", label: "Temps gagné", sub: "ce mois-ci" },
  { icon: "✅", num: "96%", label: "Taux de réussite", sub: "des tâches" },
];

const navItems = [
  { icon: "🏠", label: "Accueil" },
  { icon: "🤖", label: "Mes Agents", active: true },
  { icon: "✅", label: "Tâches" },
  { icon: "📊", label: "Statistiques" },
  { icon: "🔄", label: "Automatisations" },
  { icon: "🗄️", label: "Données" },
  { icon: "⚙️", label: "Paramètres" },
];

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAgents, setActiveAgents] = useState(
    Object.fromEntries(agents.map((a) => [a.id, true]))
  );

  const toggleAgent = (id, e) => {
    e.stopPropagation();
    setActiveAgents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.dash}>
      {/* Overlay menu mobile */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>⚔️</div>
          <div className={styles.logoName}>ATHENIA</div>
          <div className={styles.logoSub}>Automatisation</div>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div key={item.label} className={`${styles.navItem} ${item.active ? styles.active : ""}`}
              onClick={() => setMenuOpen(false)}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </nav>
        <div className={styles.turboBox}>
          <div className={styles.turboLabel}>Passez en mode</div>
          <div className={styles.turboTitle}>TURBO 🚀</div>
          <div className={styles.turboDesc}>Débloquez des agents avancés et des options premium.</div>
          <button className={styles.turboBtn}>Découvrir</button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div>
            <h1 className={styles.pageTitle}>Mes Agents IA</h1>
            <p className={styles.pageSub}>Pilotez votre équipe d'agents intelligents</p>
          </div>
          <div className={styles.topRight}>
            <button className={styles.btnNew}>+ Créer un agent</button>
            <div className={styles.userChip}>
              <div className={styles.avatar}>AC</div>
              <div>
                <div className={styles.userName}>Alice</div>
                <div className={styles.userRole}>Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statSub}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Agents */}
        <div className={styles.agentsGrid}>
          {agents.map((agent) => (
            <div key={agent.id} className={styles.agentCard}
              onClick={() => router.push(`/agent/${agent.id}`)}>
              <div className={`${styles.toggle} ${activeAgents[agent.id] ? styles.toggleOn : ""}`}
                onClick={(e) => toggleAgent(agent.id, e)} />
              <div className={styles.agentAvatar}>{agent.emoji}</div>
              <div className={styles.agentRole} style={{ color: agent.color }}>{agent.role}</div>
              <div className={styles.agentName}>{agent.name}</div>
              <div className={styles.agentDesc}>{agent.desc}</div>
              <div className={styles.agentFooter}>
                <div className={styles.statusDot}>
                  <div className={styles.dot} style={{ background: activeAgents[agent.id] ? "#1d9e75" : "#555" }} />
                  <span style={{ color: activeAgents[agent.id] ? "#1d9e75" : "#555" }}>
                    {activeAgents[agent.id] ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
                <button className={styles.openBtn}>Ouvrir →</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}