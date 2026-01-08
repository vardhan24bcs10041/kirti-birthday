# Backend Setup for Spotify Integration

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Create a file named `.env` in the root directory:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
PORT=3000
```

### 3. Get Your Spotify Credentials

1. Go to https://developer.spotify.com/dashboard
2. Create an app
3. Copy your **Client ID** and **Client Secret**
4. Paste them into `.env`

### 4. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 5. Update Frontend (if needed)

If your backend runs on a different port, update `js/spotifyPlayer.js`:

```javascript
const response = await fetch("http://localhost:3000/api/spotify/token", {
```

---

## For Production

When deploying:
- Deploy backend to a service like Heroku, Railway, or Render
- Update the frontend URL to point to your deployed backend
- Keep `.env` secure (never commit it to git)

---

## Alternative: No Backend

If you don't want to set up a backend, the site will automatically use the fallback local MP3 files. Spotify integration is optional!

