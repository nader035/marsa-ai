# 🌊 مَرسى — Marsa.ai

**An AI-Powered Authentic Retrieval Engine for Cultural and Spiritual Text.**

Marsa is a specialized web platform designed to retrieve verified texts, including Quranic verses, poetic lyrics, and literary quotes. Unlike generic chatbots, Marsa acts as a "Retrieval Engine" focusing on accuracy and cultural depth.

---

## ✨ Features

- **Authentic Retrieval:** Specialized modes for [Quran, Lyrics, Quotes].
- **Anti-Hallucination:** Strictly tuned to avoid generating fake verses or false quotes.
- **Dynamic UX:** Real-time typewriter effect, theme switching (Dark/Light), and RTL/LTR support.
- **Pro Design:** Built with Angular 19, Tailwind CSS, and FontAwesome.

---

## 🛠️ Tech Stack

- **Framework:** Angular 19 (Signals-based).
- **State Management:** NgRx SignalStore.
- **AI Model:** Qwen 2.5 72B-Instruct via Hugging Face Router.
- **Deployment:** Vercel.

---

## 🚀 Getting Started

1. Clone & Install: `npm install`
2. Configure Environment: Create `src/environments/environment.ts` with your `hfToken`.
3. Run: `ng serve --proxy-config proxy.conf.json`

---

## 🔒 Security

This project uses a secure build-time environment injection to protect API tokens from being exposed in public repositories.

---

## 👤 Developer

Developed with ❤️ by **Nader Mohamed** .
