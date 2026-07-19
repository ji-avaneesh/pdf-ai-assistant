# Remaining Tasks & Production Checklist

A checklist of keys, redirect setups, and production settings that must be configured before deploying the PDF AI Assistant application.

---

## 1. Environment Config Checklist
Ensure these environment variables are fully configured in the hosting dashboard (e.g. Render for backend, Vercel/Netlify for frontend):

### Backend Environment Variables (`server/.env`)
- [ ] `PORT` — Set to the host default or standard production port (e.g. `5001` or dynamic `process.env.PORT`).
- [ ] `MONGO_URI` — Production MongoDB connection string.
- [ ] `JWT_SECRET` — A secure, generated string (avoid local dev keys).
- [ ] `GEMINI_API_KEY` — Your live production Gemini AI credentials.

### Frontend Environment Variables (`src/.env` or Vercel Config)
- [ ] `VITE_GOOGLE_CLIENT_ID` — Your Google Cloud Console OAuth 2.0 Client ID.

---

## 2. Google OAuth Redirect Configuration (Must-Do)
Before Google Sign-In can work on your live URL:
- [ ] Open the [Google Cloud Console](https://console.cloud.google.com/).
- [ ] Go to **APIs & Services** > **Credentials**.
- [ ] Edit your OAuth 2.0 Client ID.
- [ ] Under **Authorized JavaScript origins**, add your production frontend domain (e.g., `https://your-pwa-name.vercel.app` and `http://localhost:5173`).
- [ ] Under **Authorized redirect URIs**, add your production domain and redirect endpoints.
*Without this configuration, Google Sign-in will block popup redirects with a `redirect_uri_mismatch` error.*

---

## 3. Production API Host Bindings
- [ ] Open [App.jsx](file:///Users/avaneeshkumar/Desktop/PDF%20AI%2520Assistant/src/App.jsx).
- [ ] Ensure that `API_BASE` points to your active backend deployment URL:
  ```javascript
  const API_BASE = isLocal 
    ? "http://localhost:5001" 
    : "https://your-production-backend.onrender.com";
  ```
