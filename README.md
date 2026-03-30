# 🌊 مَرسى — Marsa.ai
**The Authentic Echo of Arabic Culture & Spiritual Heritage.**

[![Angular](https://img.shields.io/badge/Angular-19+-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Marsa (مَرسى)** is a high-end, AI-powered retrieval engine dedicated to the soul of Arabic text. It provides a specialized sanctuary for finding authentic Quranic verses, legendary song lyrics (Tarab), and verified literary quotes, wrapped in a modern **Deep Ocean Blue** aesthetic.

---

## 💎 The Solo Dev Revamp: Architecture & UI

I have completely refactored the project from the ground up to transition from a simple student task into a **Professional SaaS-ready application**. 

### 🎨 Visual Identity (Ocean Deep Minimalist)
- **Design System:** Transitioned to a sleek **Glassmorphism** layout with a **Deep Ocean Blue & Slate** dynamic color palette.
- **Tailwind v4 Migration:** Fully migrated to **Tailwind v4**, retiring the traditional `tailwind.config.js` in favor of the new `@theme` directive in `src/styles.css` for a unified, high-performance styling experience.
- **Typography:** Preserved cultural identity using **Myriad Arabic** for RTL and **Myriad Pro** for LTR interfaces.
- **Premium UX:** Implemented an interactive **Sonar Wave Splash Screen** and real-time **Typewriter animations** for AI responses.

### 🌍 Global Reach (i18n)
- **Engine:** Powered by `@jsverse/transloco`.
- **Dynamic RTL/LTR:** Seamless switching between Arabic and English with synchronized layout adaptations and bi-directional UI support.
- **Signal-Based:** Leveraging Angular Signals to reactively update the UI language and state without page reloads.

### 🧠 The AI Engine (DeepSeek/Qwen Core)
- **Authenticity First:** Strictly tuned via System Prompts to prevent hallucinations. Marsa is a retrieval engine, not a generative chatbot.
- **Reasoning Cleanup:** Advanced regex parsing to strip internal AI "thinking" processes (Reasoning/Chain of Thought) for a clean, user-centric output.

---

## 🛠️ Technical Excellence

### 🏗️ Advanced Architecture
- **Framework:** Angular 19+ (Signal-based components).
- **State Management:** NgRx SignalStore for lightweight, high-performance state tracking.
- **Reverse Proxy Logic:** Solved complex **CORS (401/404)** issues on Vercel by implementing a custom **Vercel Rewrite Proxy** to bridge the frontend with the Hugging Face Inference Router securely.

### 🔒 Security & CI/CD
1. **Secrets Management:** Implemented a custom `set-env.js` script to dynamically inject `HF_TOKEN` into `environment.prod.ts` during the build process, preventing sensitive keys from being exposed in the public repository.
2. **Hugging Face Router:** Migrated to the modern `router.huggingface.co` endpoint for enhanced reliability and model load balancing.

---

## 🚀 Getting Started

### Installation
1. **Clone the Repo:**
   ```bash
   git clone [https://github.com/nader035/marsa-ai.git](https://github.com/nader035/marsa-ai.git)
   cd marsa-ai
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Create `src/environments/environment.ts` and add your Hugging Face Token:
   ```typescript
   export const environment = {
     production: false,
     hfToken: 'hf_YOUR_TOKEN_HERE'
   };
   ```
4. **Run the App:**
   ```bash
   ng serve --proxy-config proxy.conf.json
   ```

---

## 🎨 Development Setup (Tailwind v4)

We are using **Tailwind v4** with the new `@theme` directive.
- **Configuration:** All styling is managed via `@theme` in `src/styles.css`.
- **No `tailwind.config.js`:** The traditional config file has been removed for a cleaner build process.

---

## 🔒 Security & Deployment

This project uses a **Secure Build-Time Environment Injection** strategy to protect API tokens.

1. **Token Protection:** The `set-env.js` script dynamically generates `environment.prod.ts` during the Vercel build process.
2. **Reverse Proxy:** All API requests are routed through `/marsa-api/` to bypass CORS issues and manage headers securely.

---

## 👤 Developer

Developed with ❤️ by **Nader Mohamed** .