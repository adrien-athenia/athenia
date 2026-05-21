"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const agents = [
  { id: "atlas", name: "Atlas", emoji: "🧠" },
  { id: "iris", name: "Iris", emoji: "✍️" },
  { id: "axel", name: "Axel", emoji: "⚙️" },
  { id: "vera", name: "Vera", emoji: "📊" },
  { id: "felix", name: "Felix", emoji: "📋" },
  { id: "hugo", name: "Hugo", emoji: "💼" },
];

const initialTasks = [
  { id: 1, title: "Rédiger post LinkedIn semaine 21", agent: "iris", status: "done", priority: "haute", date: "2025-05-20" },
  { id: 2, title: "Analyser KPIs Q2", agent: "vera", status: "in-progress", priority: "haute", date: "2025-05-21" },
  { id: 3, title: "Workflow relance clients inactifs", agent: "axel", status: "in-progress", priority: "moyenne", date: "2025-05-21" },
  { id: 4, title: "Tableau de bord ventes mai", agent: "felix", status: "pending", priority: "moyenne", date: "2025-05-22" },
  { id: 5, title: "Suivi prospects pipeline", agent: "hugo", status: "pending", priority: "haute", date: "2025-05-22" },
  { id: 6, title: "Script vidéo YouTube", agent: "iris", status: "done", priority: "basse", date: "2025-05-19" },
  { id: 7, title: "Coordination équipe agents", agent: "atlas", status: "in-progress", priority: "haute", date: "2025-05-21" },
  { id: 8, title: "Email campagne newsletter", agent: "iris", status: "pending", priority: "moyenne", date: "2025-05-23" },
];

const STATUS = {
  "all": "Toutes",
  "pending": "En attente",
  "in-progress": "En cours",
  "done": "Terminées",
};

const PRIORITY_COLOR = {
  "haute": "#e24b4b",
  "moyenne": "#fbbf24",
  "basse": "#1d9e75",
};

export default function Taches() {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", agent: "atlas", priority: "moyenne" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: "🏠", label: "Accueil", route: "/" },
    { icon: "🤖", label: "Mes Agents", route: "/" },
    { icon: "✅", label: "Tâches", route: "/taches", active: true },
    { icon: "📊", label: "Statistiques", soon: true },
    { icon: "🔄", label: "Automatisations", soon: true },
    { icon: "⚙️", label: "Paramètres", soon: true },
  ];

  const handleNav = (item) => {
    setMobileMenuOpen(false);
    if (item.soon) { alert(`"${item.label}" — bientôt disponible !`); return; }
    router.push(item.route);
  };

  const filtered = tasks.filter(t => {
    const statusOk = filter === "all" || t.status === filter;
    const agentOk = agentFilter === "all" || t.agent === agentFilter;
    return statusOk && agentOk;
  });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, {
      id: Date.now(),
      title: newTask.title,
      agent: newTask.agent,
      status: "pending",
      priority: newTask.priority,
      date: new Date().toISOString().split("T")[0],
    }]);
    setNewTask({ title: "", agent: "atlas", priority: "moyenne" });
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = t.status === "pending" ? "in-progress" : t.status === "in-progress" ? "done" : "pending";
      return { ...t, status: next };
    }));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    done: tasks.filter(t => t.status === "done").length,
  };

  return (
    <div className={styles.dash}>
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>Nouvelle tâche</div>
            <input
              className={styles.modalInput}
              placeholder="Titre de la tâche..."
              value={newTask.title}
              onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && addTask()}
              autoFocus
            />
            <div className={styles.modalRow}>
              <select
                className={styles.modalSelect}
                value={newTask.agent}
                onChange={e => setNewTask(p => ({ ...p, agent: e.target.value }))}
              >
                {agents.map(a => (
                  <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
                ))}
              </select>
              <select
                className={styles.modalSelect}
                value={newTask.priority}
                onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}
              >
                <option value="haute">🔴 Haute</option>
                <option value="moyenne">🟡 Moyenne</option>
                <option value="basse">🟢 Basse</option>
              </select>
            </div>
            <div className={styles.modalBtns}>
              <button className={styles.modalCancel} onClick={() => setShowModal(false)}>Annuler</button>
              <button className={styles.modalConfirm} onClick={addTask}>Créer</button>
            </div>
          </div>
        </div>
      )}

      <div className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayActive : ""}`} onClick={() => setMobileMenuOpen(false)} />

      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoArea}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-athenia-luxe.png" alt="Athenia" className={styles.logoImg} />
        </div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <div
              key={item.label}
              className={`${styles.navItem} ${item.active ? styles.active : ""}`}
              onClick={() => handleNav(item)}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.soon && <span className={styles.soonBadge}>bientôt</span>}
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

      <main className={styles.main}>
        <div className={styles.topBar}>
          <button className={styles.hamburger} onClick={() => setMobileMenuOpen(p => !p)}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
          <div style={{ flex: 1 }}>
            <h1 className={styles.pageTitle}>Tâches</h1>
            <p className={styles.pageSub}>Gérez les tâches de vos agents</p>
          </div>
          <div className={styles.topRight}>
            <button className={styles.btnNew} onClick={() => setShowModal(true)}>+ Nouvelle tâche</button>
            <div className={styles.userChip}>
              <div className={styles.avatar}>AC</div>
              <div>
                <div className={styles.userName}>Alice</div>
                <div className={styles.userRole}>Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className={styles.statsRow}>
          {Object.entries(STATUS).map(([key, label]) => (
            <div
              key={key}
              className={`${styles.statChip} ${filter === key ? styles.statChipActive : ""}`}
              onClick={() => setFilter(key)}
            >
              <span className={styles.statChipNum}>{counts[key]}</span>
              <span className={styles.statChipLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* AGENT FILTER */}
        <div className={styles.agentFilter}>
          <button
            className={`${styles.agentBtn} ${agentFilter === "all" ? styles.agentBtnActive : ""}`}
            onClick={() => setAgentFilter("all")}
          >Tous</button>
          {agents.map(a => (
            <button
              key={a.id}
              className={`${styles.agentBtn} ${agentFilter === a.id ? styles.agentBtnActive : ""}`}
              onClick={() => setAgentFilter(a.id)}
            >
              {a.emoji} {a.name}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        <div className={styles.taskList}>
          {filtered.length === 0 && (
            <div className={styles.empty}>Aucune tâche pour ce filtre</div>
          )}
          {filtered.map(task => {
            const agent = agents.find(a => a.id === task.agent);
            return (
              <div key={task.id} className={`${styles.taskCard} ${task.status === "done" ? styles.taskDone : ""}`}>
                <div className={styles.taskLeft}>
                  <div className={styles.taskCheck} onClick={() => toggleStatus(task.id)}>
                    {task.status === "done" ? "✅" : task.status === "in-progress" ? "🔄" : "⬜"}
                  </div>
                  <div>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <div className={styles.taskMeta}>
                      <span>{agent?.emoji} {agent?.name}</span>
                      <span>·</span>
                      <span>{task.date}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.taskRight}>
                  <span className={styles.priorityBadge} style={{ color: PRIORITY_COLOR[task.priority], borderColor: PRIORITY_COLOR[task.priority] + "40", background: PRIORITY_COLOR[task.priority] + "15" }}>
                    {task.priority}
                  </span>
                  <div className={styles.statusBadge} style={{
                    color: task.status === "done" ? "#1d9e75" : task.status === "in-progress" ? "#fbbf24" : "#8b9ab0",
                  }}>
                    {task.status === "done" ? "Terminée" : task.status === "in-progress" ? "En cours" : "En attente"}
                  </div>
                  <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
