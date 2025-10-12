// scripts/api.js
(function () {
  const host = location.hostname;
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(host); // any LAN IP like 192.168.x.x

  window.API = isLocal
    ? `http://${host}:3000` // your local backend
    : "https://sdev255-m06-tutorial-backend.onrender.com"; // your Render backend

  console.log("API base:", window.API);
})();
