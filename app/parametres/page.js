"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const navItems = [
  { icon: "🏠", label: "Accueil", route: "/" },
  { icon: "🤖", label: "Mes Agents", route: "/" },
  { icon: "✅", label: "Tâches", route: "/taches" },
  { icon: "📊", label: "Statistiques", route: "/statistiques" },
  { icon: "🔄", label: "Automatisations", route: "/automatisations" },
  { icon: "⚙️", label: "Paramètres", route: "/parametres", active: true },
];

export default function Parametres() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ name: "Alice", email: "alice@athenia.ai", role: "Manager" });
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true });
  const [saved, setSaved] = useState(false);

  const handleNav = (item) => { setMobileMenuOpen(false); router.push(item.route); };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
            <h1 className={styles.pageTitle}>Paramètres</h1>
            <p className={styles.pageSub}>Gérez votre compte et vos préférences</p>
          </div>
          <div className={styles.userChip}>
            <div className={styles.avatar}>AC</div>
            <div><div className={styles.userName}>Alice</div><div className={styles.userRole}>Manager</div></div>
          </div>
        </div>

        <div className={styles.sections}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>👤 Profil</div>
            <div className={styles.field}>
              <label className={styles.label}>Nom</label>
              <input className={styles.input} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rôle</label>
              <input className={styles.input} value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>🔔 Notifications</div>
            {[
              { key: "email", label: "Notifications par email" },
              { key: "push", label: "Notifications push" },
              { key: "weekly", label: "Rapport hebdomadaire" },
            ].map(({ key, label }) => (
              <div key={key} className={styles.toggleRow}>
                <span className={styles.toggleLabel}>{label}</span>
                <div className={`${styles.toggle} ${notifs[key] ? styles.toggleOn : ""}`} onClick={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>🔑 API & Intégrations</div>
            <div className={styles.field}>
              <label className={styles.label}>Clé API Anthropic</label>
              <input className={styles.input} type="password" placeholder="sk-ant-••••••••••••••••" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Webhook n8n</label>
              <input className={styles.input} placeholder="https://your-n8n.io/webhook/..." />
            </div>
          </div>

          <button className={`${styles.saveBtn} ${saved ? styles.saveBtnSuccess : ""}`} onClick={save}>
            {saved ? "✓ Sauvegardé !" : "Sauvegarder les modifications"}
          </button>
        </div>
      </main>
    </div>
  );
}
