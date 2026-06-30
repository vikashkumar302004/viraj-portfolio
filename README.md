# Viraj Ventures — Premium Freelance Portfolio Website

A state-of-the-art, high-performance freelance portfolio and lead generation platform designed and developed by **Vikash Kumar**, a professional Full-Stack Freelance Developer. 

This project was built from scratch as a premium showcase of freelance services, custom business portfolios, responsive mobile applications, and high-performance landing pages.

---

## 👨‍💻 Developer Profile

* **Developer & Architect**: **Vikash Kumar**
* **Role**: Freelance Full-Stack Developer
* **Purpose**: This repository serves as a flagship freelance showcase, demonstrating capability in modern UI design (Tailwind, Glassmorphism, Framer Motion), serverless database architectures (Firebase Firestore), and advanced AI integrations (Groq LLaMA 3.3).

---

## 🚀 Key Core Features

* **Bilingual AI Chatbot Assistant**: A floating chat widget powered by LLaMA 3.3 via the Groq API. It naturally understands and responds in both **English** and **Hinglish**, answering client inquiries about project scopes, freelance developer details (Vikash Kumar), pricing, and contact links.
* **Serverless Firestore Lead Capture**: An interactive submission form that logs client leads, budgets, deadline requirements, and custom brand color choices directly into Google Firebase Firestore.
* **Dynamic Interactive Live Preview**: Real-time canvas template previewing that updates colors, text, and layout on-the-fly as prospective clients select their project preferences in the form.
* **Secure Admin Dashboard**: A passcode-protected control panel (passcodes: `viraj17`, `7498`, `2009`) allowing the site owner to manage client leads, update statuses, edit private notes, delete records, or launch direct pre-filled WhatsApp chats.
* **Premium Aesthetics**: Dark mode styling, responsive grid layouts, custom glow cursor trail tracking, interactive canvas particle backgrounds, and smooth spring-based animations.

---

## 🛠️ Complete Technology Stack

* **Frontend Framework**: React 19 + TypeScript + Vite 6
* **Styling**: Tailwind CSS v4 + Custom CSS Token System
* **Animations**: Framer Motion (via `motion/react`)
* **Icons**: Lucide React
* **Database & Rules**: Google Firebase Firestore (Serverless)
* **AI Engine**: Groq SDK / LLaMA 3.3 model

---

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the Repository & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and configure the Groq API key:
   ```env
   VITE_GROQ_API_KEY="your_groq_api_key_here"
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://127.0.0.1:3010/](http://127.0.0.1:3010/) in your browser.

---

## 📦 Production Deployment (Vercel)

This application can be deployed to Vercel in seconds since it is a static React app communicating directly with Firestore:

1. Install Vercel CLI globally: `npm install -g vercel`
2. Run `vercel` in the root directory and follow the prompts.
3. Configure the environment variable on Vercel:
   - Key: `VITE_GROQ_API_KEY`
   - Value: `your_groq_api_key_here`
4. Run `vercel --prod` to deploy to production.

---

*Designed and Developed by Vikash Kumar.*
