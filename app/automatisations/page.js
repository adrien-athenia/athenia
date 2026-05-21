"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const navItems = [
  { icon: "🏠", label: "Accueil", route: "/" },
  { icon: "🤖", label: "Mes Agents", route: "/" },
  { icon: "✅", label: "Tâches", route: "/taches" },
  { icon: "📊", label: "Statistiques", route: "/statistiques" },
  { icon: "🔄", label: "Automatisations", route: "/automatisations", active: true },
  { icon: "⚙️", label: "Paramètres", route: "/parametres" },
];

const initialWorkflows = [
  { id: 1, name: "Relance clients inactifs", trigger: "Chaque lundi 9h", agents: ["Hugo", "Iris"], status: true, runs: 12 },
  { id: 2, name: "Rapport hebdomadaire", trigger: "Vendredi 17h", agents: ["Vera", "Felix"], status: true, runs: 8 },
  { id: 3, name: "Post LinkedIn automatique", trigger: "Mardi & Jeudi 8h", agents: ["Iris"], status: true, runs: 24 },
  { id: 4, name: "Analyse KPIs mensuelle", trigger: "1er du mois", agents: ["Vera", "Atlas"], status: false, runs: 3 },
  { id: 5, name: "Mise à jour CRM", trigger: "Quotidien 23h", agents: ["Hugo", "Axel"], status: true, runs: 30 },
];

export default function Automatisations() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workflows, setWorkflows] = useState(initialWorkflows);

  const handleNav = (item) => { setMobileMenuOpen(false); router.push(item.route); };
  const toggleWf = (id) => setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: !w.status } : w));

  return (
    <div className={styles.dash}>
      <div className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayActive : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoArea}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-athenia-luxe.png" alt="Athenia" className={styles.logoImg} />
        </div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <div key={item.label} className={`${styles.navItem} ${item.active ? styles.active : ""}`} onClick={() => handleNav(item)}>
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

      <main className={styles.main}>
        <div className={styles.topBar}>
          <button className={styles.hamburger} onClick={() => setMobileMenuOpen(p => !p)}>{mobileMenuOpen ? "✕" : "☰"}</button>
          <div style={{ flex: 1 }}>
            <h1 className={styles.pageTitle}>Automatisations</h1>
            <p className={styles.pageSub}>Gérez vos workflows et déclencheurs</p>
          </div>
          <div className={styles.topRight}>
            <button className={styles.btnNew} onClick={() => alert("Créateur de workflow — bientôt disponible !")}>+ Nouveau workflow</button>
            <div className={styles.userChip}>
              <div className={styles.avatar}>AC</div>
              <div><div className={styles.userName}>Alice</div><div className={styles.userRole}>Manager</div></div>
            </div>
          </div>
        </div>

        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>{workflows.filter(w => w.status).length}</div><div className={styles.kpiLabel}>Workflows actifs</div></div>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>{workflows.reduce((a, w) => a + w.runs, 0)}</div><div className={styles.kpiLabel}>Exécutions totales</div></div>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>100%</div><div className={styles.kpiLabel}>Taux de succès</div></div>
        </div>

        <div className={styles.wfList}>
          {workflows.map(wf => (
            <div key={wf.id} className={`${styles.wfCard} ${!wf.status ? styles.wfOff : ""}`}>
              <div className={styles.wfLeft}>
                <div className={styles.wfIcon}>🔄</div>
                <div>
                  <div className={styles.wfName}>{wf.name}</div>
                  <div className={styles.wfMeta}>
                    <span>⏰ {wf.trigger}</span>
                    <span>·</span>
                    <span>{wf.agents.join(", ")}</span>
                    <span>·</span>
                    <span>{wf.runs} exécutions</span>
                  </div>
                </div>
              </div>
              <div className={styles.wfRight}>
                <div className={`${styles.toggle} ${wf.status ? styles.toggleOn : ""}`} onClick={() => toggleWf(wf.id)} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
