# Project Structure & Architecture Guide

This document maps out the repository structure of the **Viraj Ventures** application, describing the role of each directory, key components, and explaining the setup of API keys.

---

## 📂 Directory Layout

```text
viraj-ventures/
├── assets/                 # Deprecated / AI Studio default assets directory
├── dist/                   # Compiled production files (after npm run build)
├── image/                  # Contains raw image assets (original source photos)
├── node_modules/           # Installed npm packages
├── src/                    # Main source code directory
│   ├── components/         # Modular React UI components
│   │   ├── AboutMe.tsx     # Bio biography & direct contact links
│   │   ├── AdminPanel.tsx  # Secure dashboard for lead management (passcode-protected)
│   │   ├── Chatbot.tsx     # Floating LLaMA-powered bilingual assistant
│   │   ├── Faq.tsx         # Collapsible Accordion Frequently Asked Questions
│   │   ├── Hero.tsx        # Landing intro panel with typewriter taglines & terminal build simulation
│   │   ├── InteractivePreview.tsx # Live mock frame that updates colors/text dynamically
│   │   ├── Navbar.tsx      # Floating top navigation bar & Admin console switch
│   │   ├── ParticleBackground.tsx # Interactive HTML5 Canvas math particles
│   │   ├── ProjectForm.tsx # Lead capture form collecting budget, color presets, ideas
│   │   └── Services.tsx    # Details of card services offered (Web, Android, UI)
│   ├── App.tsx             # Root layout rendering views & mounting the Chatbot
│   ├── firebase.ts         # Firebase configuration & Firestore client initialization
│   ├── index.css           # Global custom styled tokens & Tailwind directives
│   ├── main.tsx            # Main entry point mounting React root
│   ├── types.ts            # Shared TypeScript interfaces (Leads, AdminConfig, ProjectType)
│   ├── viraj.jpeg          # Owner profile picture (imported and rendered across components)
│   └── vite-env.d.ts       # Global TypeScript definitions for Vite env variables & jpeg assets
├── .env.example            # Environment variables format example
├── .env.local              # Local private environment variables (DO NOT COMMIT)
├── .gitignore              # Files/folders ignored by Git version control
├── firebase-applet-config.json # Raw Firebase configuration values
├── firestore.rules         # Security access rules for Firestore database
├── index.html              # Core single-page entry HTML file
├── package.json            # Node.js dependencies, scripts, and package metadata
├── tsconfig.json           # TypeScript compilation settings
└── vite.config.ts          # Vite bundler, alias resolutions, and server ports configuration
```

---

## 🔑 API Key Configurations & Setup

The application integrates two main backend connections: **Firebase Firestore** and **Groq LLaMA Chat Completions**.

### 1. Groq AI Chatbot API Key (`VITE_GROQ_API_KEY`)
The floating chatbot (`src/components/Chatbot.tsx`) requests answers directly from Groq's endpoint.
* **Local Setup**: Set this key inside a `.env.local` file at the root of the project:
  ```env
  VITE_GROQ_API_KEY="gsk_T98M..."
  ```
  Vite automatically loads keys prefixed with `VITE_` and exposes them in the browser via `import.meta.env.VITE_GROQ_API_KEY`.
* **Vercel / Production Setup**: Since `.env.local` is gitignored to secure your keys, you must set `VITE_GROQ_API_KEY` manually in your Vercel Dashboard project settings under **Settings > Environment Variables**.

---

### 2. Firebase SDK Config
The database initialization lives inside [firebase.ts](file:///c:/Users/vikash/Downloads/viraj-ventures/src/firebase.ts). It matches the configurations declared in [firebase-applet-config.json](file:///c:/Users/vikash/Downloads/viraj-ventures/firebase-applet-config.json).
* **Project ID**: `earnest-logic-92t1j`
* **Firestore Custom Database ID**: `ai-studio-virajventures-dd990b68-cd28-4118-88c5-7e6901c85f29`
* **Security Rules**: Deployed via [firestore.rules](file:///c:/Users/vikash/Downloads/viraj-ventures/firestore.rules), which allows open read/write operations to the `/leads` collection for testing.
* **Storage Location**: Leads are stored in the `'leads'` collection. The structure details are defined in `src/types.ts` under the `Lead` interface.
