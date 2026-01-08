# Quick Spotify Setup Guide

## ⚠️ Important: Client Secret Security

Spotify's API requires a **Client Secret** for authentication, which **cannot** be exposed in frontend code. You have two options:

### Option A: Simple Backend (Recommended for this project)

I'll create a simple Node.js backend that handles the Spotify API calls securely.

### Option B: Use Spotify Embed (Simpler, but less control)

Use Spotify's embed player (iframe) - simpler but you can't customize it as much.

---

## Quick Start (Option A - Backend)

### Step 1: Get Your Spotify Credentials

1. Go to https://developer.spotify.com/dashboard
2. Create an app
3. Copy your **Client ID** and **Client Secret**

### Step 2: Set Up Backend

I'll create a simple Express server for you. Just run:

```bash
npm install express cors dotenv
```

### Step 3: Configure

1. Add your credentials to `js/spotifyPlayer.js`:
   - Set `SPOTIFY_CLIENT_ID` (this is safe to expose)
2. Add your credentials to backend `.env`:
   - `SPOTIFY_CLIENT_ID=your_client_id`
   - `SPOTIFY_CLIENT_SECRET=your_client_secret`

### Step 4: Add Your Playlist/Tracks

In `js/spotifyPlayer.js`, either:
- Set `SPOTIFY_PLAYLIST_ID` to a playlist ID, OR
- Add track IDs to `SPOTIFY_TRACK_IDS` array

---

## Finding Spotify IDs

### Playlist ID:
1. Open playlist on Spotify
2. Click "Share" → "Copy link to playlist"
3. URL looks like: `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`
4. The ID is: `37i9dQZF1DXcBWIGoYBM5M`

### Track ID:
1. Open track on Spotify
2. Click "Share" → "Copy link to track"
3. URL looks like: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
4. The ID is: `4cOdK2wGLETKBW3PvgPWqT`

---

## What You Get

✅ Track titles and artists from Spotify  
✅ Album art automatically  
✅ 30-second previews (or full songs if you set up Web Playback SDK)  
✅ Fallback to local MP3 files if Spotify fails  

---

## Next Steps

Tell me:
1. Do you want me to create a simple backend server?
2. Or do you prefer to use local MP3 files only (no Spotify)?

I can set up either option for you!

