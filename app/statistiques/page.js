"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const navItems = [
  { icon: "🏠", label: "Accueil", route: "/" },
  { icon: "🤖", label: "Mes Agents", route: "/" },
  { icon: "✅", label: "Tâches", route: "/taches" },
  { icon: "📊", label: "Statistiques", route: "/statistiques", active: true },
  { icon: "🔄", label: "Automatisations", route: "/automatisations" },
  { icon: "⚙️", label: "Paramètres", route: "/parametres" },
];

const weekData = [
  { day: "Lun", tasks: 32, success: 31 },
  { day: "Mar", tasks: 45, success: 43 },
  { day: "Mer", tasks: 38, success: 36 },
  { day: "Jeu", tasks: 52, success: 50 },
  { day: "Ven", tasks: 41, success: 40 },
  { day: "Sam", tasks: 20, success: 19 },
  { day: "Dim", tasks: 19, success: 18 },
];

const agentStats = [
  { name: "Atlas", emoji: "🧠", tasks: 48, success: 96, time: "22h" },
  { name: "Iris", emoji: "✍️", tasks: 61, success: 98, time: "31h" },
  { name: "Axel", emoji: "⚙️", tasks: 39, success: 94, time: "19h" },
  { name: "Vera", emoji: "📊", tasks: 44, success: 97, time: "24h" },
  { name: "Felix", emoji: "📋", tasks: 35, success: 95, time: "18h" },
  { name: "Hugo", emoji: "💼", tasks: 20, success: 92, time: "14h" },
];

const maxTasks = Math.max(...weekData.map(d => d.tasks));

export default function Statistiques() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (item) => {
    setMobileMenuOpen(false);
    router.push(item.route);
  };

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
            <h1 className={styles.pageTitle}>Statistiques</h1>
            <p className={styles.pageSub}>Performance de votre équipe d'agents</p>
          </div>
          <div className={styles.userChip}>
            <div className={styles.avatar}>AC</div>
            <div><div className={styles.userName}>Alice</div><div className={styles.userRole}>Manager</div></div>
          </div>
        </div>

        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>247</div><div className={styles.kpiLabel}>Tâches cette semaine</div><div className={styles.kpiTrend}>+12% vs semaine dernière</div></div>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>96%</div><div className={styles.kpiLabel}>Taux de réussite global</div><div className={styles.kpiTrend}>+2% vs semaine dernière</div></div>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>128h</div><div className={styles.kpiLabel}>Temps gagné ce mois</div><div className={styles.kpiTrend}>+18h vs mois dernier</div></div>
          <div className={styles.kpiCard}><div className={styles.kpiVal}>8</div><div className={styles.kpiLabel}>Agents actifs</div><div className={styles.kpiTrend}>100% en ligne</div></div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Tâches par jour — cette semaine</div>
          <div className={styles.chart}>
            {weekData.map(d => (
              <div key={d.day} className={styles.bar}>
                <div className={styles.barWrap}>
                  <div className={styles.barFill} style={{ height: `${(d.tasks / maxTasks) * 100}%` }} />
                  <div className={styles.barSuccess} style={{ height: `${(d.success / maxTasks) * 100}%` }} />
                </div>
                <div className={styles.barLabel}>{d.day}</div>
                <div className={styles.barNum}>{d.tasks}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Performance par agent</div>
          <div className={styles.agentTable}>
            {agentStats.map(a => (
              <div key={a.name} className={styles.agentRow}>
                <div className={styles.agentInfo}><span>{a.emoji}</span><span>{a.name}</span></div>
                <div className={styles.agentBar}>
                  <div className={styles.agentBarFill} style={{ width: `${a.success}%` }} />
                </div>
                <div className={styles.agentNums}>
                  <span className={styles.agentSuccess}>{a.success}%</span>
                  <span className={styles.agentTasks}>{a.tasks} tâches</span>
                  <span className={styles.agentTime}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
