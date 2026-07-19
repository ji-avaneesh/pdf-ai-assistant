# Next Steps Implementation Plan

An execution outline mapping out next steps, structural enhancements, and the production rollout process.

---

## Step 1: Frontend Build Optimization & Environment Settings
* **Objective**: Establish separate development and production build configurations.
* **How**:
  * Set up `.env` for local and `.env.production` files.
  * Verify that Vite imports keys dynamically: `import.meta.env.VITE_GOOGLE_CLIENT_ID`.
  * Audit client bundle sizes (`npm run build`) to ensure loading speeds are optimal.

---

## Step 2: Backend Security Hardening & Rate-Limiting
* **Objective**: Guard auth routes against brute-force login requests.
* **How**:
  * Install `express-rate-limit` inside the `server/` directory.
  * Register rate limiters specifically on `/api/auth/login` and `/api/auth/signup` to prevent brute-force attacks.
  * Restrict CORS origin rules to allow requests *only* from your production frontend URL.

---

## Step 3: OCR Progress Indicators & Empty State Cleanups
* **Objective**: Inform the user when Multimodal Vision OCR is running.
* **How**:
  * Gemini Vision OCR text transcription takes between 3 to 6 seconds depending on the file complexity.
  * Implement a visual message in the chat or sidebar (`"Transcribing scanned document layout..."`) on the client while the upload API returns a pending status.

---

## Step 4: Production Deployment Pipeline
* **Objective**: Launch the app online.
* **How**:
  * **Frontend**: Deploy the React code directly to Vercel/Netlify using Git triggers.
  * **Backend**: Deploy the Express code on Render/Railway. Add environment secrets for Mongo and Gemini API keys.
  * **Domain Setup**: Bind your custom domains and finalize the Google Cloud Console redirect keys.
