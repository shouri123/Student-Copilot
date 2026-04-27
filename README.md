# 🚀 Adaptive Student Copilot

Adaptive Student Copilot is an AI-powered adaptive learning mentor that tracks goals, identifies skill gaps, and provides personalized daily guidance to help students stay on track and succeed. 

Built for modern students, it replaces a one-size-fits-all education approach with a highly tailored, multi-agent AI system operating as a 24/7 personalized mentor.

---

## ✨ Key Features

* **🧠 Multi-Agent AI System:** Powered by the Gemini API, the platform utilizes specialized AI agents (Goal, Skill Gap, Challenge, Psychology, Prediction, Planner) to deliver holistic mentorship.
* **🎯 Dynamic Goal Tracking:** Interactive onboarding helps students break down long-term goals into actionable daily steps.
* **🔍 Skill Gap Identification:** Continuously analyzes progress to pinpoint deficiencies and provides targeted resources before roadblocks occur.
* **💡 Psychological Support:** A dedicated Psychology Agent monitors sentiment, combating impostor syndrome, procrastination, and burnout with behavioral interventions.
* **📂 Portfolio Building:** Curated, dynamic project suggestions based on user skill level (Beginner, Intermediate, Advanced) to ensure students build practical, resume-ready projects.
* **📬 Daily Automated Email Digests:** Sends personalized, highly tailored daily learning plans using Nodemailer to keep students consistent and motivated.
* **⚡ Blazing Fast, Pure CSS Dashboard:** A premium, responsive dashboard utilizing complex CSS grids and native CSS charting for optimal performance.

---

## 🛠️ Technology Stack

* **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, TypeScript
* **Styling:** CSS Modules, Custom Pure-CSS Graphs, CSS Grid
* **Authentication:** [Firebase Auth](https://firebase.google.com/docs/auth)
* **AI & Machine Learning:** Google [Gemini API](https://ai.google.dev/)
* **Email Service:** Nodemailer
* **Deployment:** Vercel

---

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/shouri123/Student-Copilot.git
cd Student-Copilot
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your credentials. See `.env.example` for the required variables:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# SMTP (Nodemailer) for Daily Emails
EMAIL_SERVER_HOST=smtp.ethereal.email # or your SMTP provider
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_smtp_user
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM="Adaptive Copilot <noreply@yourdomain.com>"
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🏗️ Architecture & Implementation Details

* **State Management:** Utilizes a unified state store via React Context (`useAuth`) to handle complex onboarding forms and persistent user sessions seamlessly.
* **AI Orchestration:** To ensure structured AI outputs, the system relies on rigorous prompt engineering with defined JSON schemas and incorporates a robust fallback system (mock data) in case of API latency or rate limits.
* **Performance Optimizations:** Heavy third-party charting libraries were bypassed in favor of pure CSS-based bar charts, maintaining top-tier performance without layout thrashing.

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open an issue or submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
