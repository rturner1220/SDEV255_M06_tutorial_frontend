// scripts/api.js
// use localhost in dev, Render in prod
const API = location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://sdev255-m06-tutorial-backend.onrender.com"; // ⬅ replace with your backend Render URL
