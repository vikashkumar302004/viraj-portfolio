# Viraj Ventures — Premium Portfolio & AI Assistant

A state-of-the-art, high-performance portfolio and lead generation platform designed and built by **Viraj Bakale**, a 17-year-old tech craftsman and developer based in Karad, Maharashtra. 

This application translates visitor project ideas into custom visual mockups, connects clients directly via WhatsApp, and features a bilingual AI Assistant powered by LLaMA 3.

---

## 🚀 Key Features

* **Bilingual AI Chatbot Assistant**: A floating chat widget powered by LLaMA 3 via the Groq API. It understands and answers visitor questions in both **English** and **Hinglish** regarding services, pricing, tech stack, and contact coordinates.
* **Serverless Firestore Integration**: An interactive project submission form that logs client leads, budgets, deadline requirements, and custom brand color choices directly into Google Firebase Firestore.
* **Interactive Live Preview**: Real-time canvas template previewing that updates dynamically as visitors select their project scope and brand color.
* **Secure Admin Console**: A passcode-protected dashboard panel (passcodes: `viraj17`, `7498`, `2009`) allowing the owner to manage client leads, update statuses, edit private notes, delete records, or launch direct pre-filled WhatsApp chats.
* **Futuristic Visual Design**: Modern dark mode/glassmorphism aesthetics, responsive styling, interactive canvas particle backgrounds, and smooth framer-motion micro-animations.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + TypeScript + Vite 6
* **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Tokens
* **Animations**: Framer Motion (via `motion/react`)
* **Icons**: Lucide React
* **Database & Rules**: Google Firebase Firestore (Serverless)
* **AI Engine**: Groq SDK / LLaMA 3.3 model

---

## ⚙️ Quick Start (Local Run)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the Repository & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY="your_groq_api_key_here"
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://127.0.0.1:3010/](http://127.0.0.1:3010/) in your browser to view the application.

---

## 📦 Production Deployment (Vercel)

This application can be deployed to Vercel in seconds since it is a static React app communicating directly with Firestore:

1. Install Vercel CLI globally: `npm install -g vercel`
2. Run `vercel` in the root directory and follow the prompts.
3. Configure the environment variable on Vercel:
   - Key: `VITE_GROQ_API_KEY`
   - Value: `your_groq_api_key`
4. Run `vercel --prod` to deploy to production.

---

*Crafted with 💻 and 💜 by Viraj Bakale.*
