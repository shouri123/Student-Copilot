import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// During Next.js build on Vercel, env vars might be missing, so we provide a fallback
const app = getApps().length > 0 ? getApp() : initializeApp({
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey || "demo-api-key-to-pass-build",
  authDomain: firebaseConfig.authDomain || "demo.firebaseapp.com",
  projectId: firebaseConfig.projectId || "demo-project",
});

const auth = getAuth(app);

export { app, auth };
