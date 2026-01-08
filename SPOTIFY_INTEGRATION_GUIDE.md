# Spotify API Integration Guide

## Overview

There are **two main ways** to integrate Spotify:

### Option 1: Spotify Web API (Easier, No Premium Required)
- ✅ Works for everyone (no Premium needed)
- ✅ Can fetch track info, album art, 30-second previews
- ❌ Only 30-second preview clips (not full songs)
- ✅ Good for showing track info and album art

### Option 2: Spotify Web Playback SDK (Full Playback)
- ✅ Full song playback
- ❌ Requires Spotify Premium account
- ❌ Requires OAuth authentication
- ❌ More complex setup (needs backend for security)

---

## Step 1: Create Spotify Developer Account

1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in:
   - **App name**: "Kirti's Birthday Player" (or whatever you want)
   - **App description**: "Personal birthday music player"
   - **Redirect URI**: `http://localhost:5500` (for local testing)
   - **Website**: Your site URL (or `http://localhost:5500` for testing)
5. Check the agreement and click **"Save"**
6. Copy your **Client ID** and **Client Secret** (you'll need these)

---

## Step 2: Choose Your Approach

### For This Project, I Recommend: **Hybrid Approach**

- Use Spotify Web API to fetch track info and album art
- Use local MP3 files OR Spotify 30-second previews for audio
- This works for everyone without requiring Premium

---

## Step 3: Implementation

I'll create a new file `js/spotifyPlayer.js` that:
1. Fetches track info from Spotify (album art, titles, artists)
2. Uses 30-second previews OR your local MP3 files
3. Shows beautiful album art from Spotify
4. Works without Premium

---

## Important Notes

### Security Warning
⚠️ **Never expose your Client Secret in frontend code!**

For a static site (like this), you have two options:
1. **Use Client ID only** (public, safe) - can fetch public track info
2. **Use a backend** (Node.js/Express) to hide Client Secret

For this birthday site, we'll use **Option 1** (Client ID only) since we're just fetching public track info.

### If You Want Full Playback (Premium Required)
You'll need:
- A backend server (Node.js/Express) to handle OAuth
- Spotify Premium account
- More complex setup

---

## Next Steps

I'll create the implementation files for you. Just provide:
1. Your Spotify **Client ID** (from Step 1)
2. A Spotify playlist ID or track IDs you want to use

Or I can set it up with a default TV Girl / Radiohead playlist!

