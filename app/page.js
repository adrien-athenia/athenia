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
  { icon: "🏠", label: "Accueil", route: "/" },
  { icon: "🤖", label: "Mes Agents", route: "/", active: true },
  { icon: "✅", label: "Tâches", soon: true },
  { icon: "📊", label: "Statistiques", soon: true },
  { icon: "🔄", label: "Automatisations", soon: true },

  { icon: "⚙️", label: "Paramètres", soon: true },
];

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Mes Agents");
  const [activeAgents, setActiveAgents] = useState(
    Object.fromEntries(agents.map((a) => [a.id, true]))
  );

  const toggleAgent = (id, e) => {
    e.stopPropagation();
    setActiveAgents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNav = (item) => {
    closeMobileMenu();
    if (item.soon) {
      alert(`"${item.label}" — bientôt disponible !`);
      return;
    }
    setActiveNav(item.label);
    router.push(item.route);
  };

  return (
    <div className={styles.dash}>
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayActive : ""}`}
        onClick={closeMobileMenu}
      />

      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoArea}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-athenia-luxe.png" alt="Athenia" className={styles.logoImg} />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`${styles.navItem} ${activeNav === item.label ? styles.active : ""}`}
              onClick={() => handleNav(item)}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.soon && (
                <span className={styles.soonBadge}>bientôt</span>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.turboBox}>
          <div className={styles.turboLabel}>Passez en mode</div>
          <div className={styles.turboTitle}>TURBO 🚀</div>
          <div className={styles.turboDesc}>
            Débloquez des agents avancés et des options premium.
          </div>
          <button className={styles.turboBtn}>Découvrir</button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <div style={{ flex: 1 }}>
            <h1 className={styles.pageTitle}>Mes Agents IA</h1>
            <p className={styles.pageSub}>Pilotez votre équipe d'agents intelligents</p>
          </div>

          <div className={styles.topRight}>
            <button className={styles.btnNew}>+ Créer un agent</button>
            <div className={styles.bell}>🔔</div>
            <div className={styles.userChip}>
              <div className={styles.avatar}>AC</div>
              <div>
                <div className={styles.userName}>Alice</div>
                <div className={styles.userRole}>Manager</div>
              </div>
            </div>
          </div>
        </div>

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

        <div className={styles.agentsGrid}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={styles.agentCard}
              onClick={() => router.push(`/agent/${agent.id}`)}
            >
              <div
                className={`${styles.toggle} ${activeAgents[agent.id] ? styles.toggleOn : ""}`}
                onClick={(e) => toggleAgent(agent.id, e)}
              />
              <div className={styles.agentAvatar}>{agent.emoji}</div>
              <div className={styles.agentRole} style={{ color: agent.color }}>
                {agent.role}
              </div>
              <div className={styles.agentName}>{agent.name}</div>
              <div className={styles.agentDesc}>{agent.desc}</div>
              <div className={styles.agentFooter}>
                <div className={styles.statusDot}>
                  <div
                    className={styles.dot}
                    style={{ background: activeAgents[agent.id] ? "#1d9e75" : "#555" }}
                  />
                  <span style={{ color: activeAgents[agent.id] ? "#1d9e75" : "#555", fontSize: "11px" }}>
                    {activeAgents[agent.id] ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
                <button
                  className={styles.openBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/agent/${agent.id}`);
                  }}
                >
                  Ouvrir →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
