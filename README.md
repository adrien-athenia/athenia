# Athenia — Mes Agents IA 🤖

Dashboard d'agents IA alimentés par GPT-4o (OpenAI).

## 🚀 Installation en 4 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer ta clé API OpenAI
Copie le fichier `.env.local.example` en `.env.local` :
```bash
cp .env.local.example .env.local
```
Puis ouvre `.env.local` et remplace la valeur :
```
OPENAI_API_KEY=sk-ta-vraie-cle-ici
```

### 3. Lancer en local
```bash
npm run dev
```
Ouvre http://localhost:3000 dans ton navigateur.

### 4. Déployer sur Vercel (gratuit)

1. Crée un compte sur https://vercel.com
2. Installe Vercel CLI : `npm i -g vercel`
3. Dans le dossier du projet : `vercel`
4. Dans les settings Vercel, ajoute la variable d'environnement :
   - **Name** : `OPENAI_API_KEY`
   - **Value** : ta clé OpenAI

C'est tout ! ✅

## 🤖 Les 8 agents

| Agent | Rôle | Spécialité |
|-------|------|-----------|
| Atlas 🧠 | Chef d'orchestre | Coordination, stratégie |
| Iris ✍️ | Créatrice de contenu | Posts, emails, scripts |
| Axel ⚙️ | Expert automatisation | n8n, Make, webhooks |
| Vera 📊 | Analyste business | KPI, données, rapports |
| Felix 📋 | Expert Excel | Formules, dashboards, VBA |
| Hugo 💼 | Assistant commercial | Prospection, relances |
| Zara 🔍 | Spécialiste SEO | SEO on/off-page, contenu |
| Kai 🎬 | Créateur vidéo | Scripts, YouTube, TikTok |

## 🛠 Personnaliser les agents

Modifie le fichier `lib/agents.js` pour :
- Changer les noms et emojis
- Modifier les system prompts (le comportement de chaque agent)
- Ajouter de nouveaux agents

## 📁 Structure du projet

```
athenia/
├── app/
│   ├── api/chat/route.js     ← API OpenAI (backend)
│   ├── agent/[id]/page.js    ← Page de chat d'un agent
│   ├── page.js               ← Dashboard principal
│   └── globals.css
├── lib/
│   └── agents.js             ← Définitions des agents
└── .env.local                ← Ta clé API (ne pas partager !)
```
