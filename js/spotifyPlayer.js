// Spotify Web API Integration for Music Player
// This uses Spotify's public API to fetch track info and album art
// Works without Premium, but only provides 30-second previews

// ============================================
// CONFIGURATION
// ============================================

// Your Spotify Client ID (from https://developer.spotify.com/dashboard)
// ⚠️ This is safe to expose in frontend code (it's public)
const SPOTIFY_CLIENT_ID = "YOUR_CLIENT_ID_HERE";

// Option 1: Use a Spotify Playlist ID
// Find this in the Spotify playlist URL: spotify.com/playlist/PLAYLIST_ID
const SPOTIFY_PLAYLIST_ID = null; // e.g., "37i9dQZF1DXcBWIGoYBM5M"

// Option 2: Use specific Track IDs (for TV Girl, Radiohead, etc.)
// Find these in track URLs: spotify.com/track/TRACK_ID
const SPOTIFY_TRACK_IDS = [
  // TV Girl tracks (example IDs - replace with actual ones)
  // "4cOdK2wGLETKBW3PvgPWqT", // "Not Allowed" by TV Girl
  // "6x8ZfSoqDjuNa5SVP5QjvX", // "Lovers Rock" by TV Girl
  // Radiohead tracks (example IDs - replace with actual ones)
  // "4uLU6hMCjMI75M1A2tKUQC", // "Creep" by Radiohead
  // "5C2ry6OOnoK1h4fx8fHqyO", // "Karma Police" by Radiohead
];

// Fallback: If Spotify API fails, use these local tracks
const FALLBACK_PLAYLIST = [
  {
    title: "Soft Intro (For Kirti)",
    artist: "A Tiny Cat DJ",
    src: "assets/audio/track1.mp3",
    albumArt: null,
  },
  {
    title: "Strawberry Skies",
    artist: "Indie Daydreams",
    src: "assets/audio/track2.mp3",
    albumArt: null,
  },
  {
    title: "Late Night Ginger Ale",
    artist: "Lo-fi Heartbeats",
    src: "assets/audio/track3.mp3",
    albumArt: null,
  },
];

// ============================================
// SPOTIFY API FUNCTIONS
// ============================================

let accessToken = null;

// Get Spotify access token via backend proxy
// ⚠️ This requires a backend server (see server.js example)
async function getSpotifyToken() {
  if (accessToken) return accessToken;

  try {
    // Call your backend endpoint (update this URL to match your backend)
    const response = await fetch("http://localhost:3000/api/spotify/token", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get Spotify token");
    }

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Spotify token error:", error);
    console.log("Note: Backend server required for Spotify integration");
    return null;
  }
}

// Fetch tracks from a playlist
async function fetchPlaylistTracks(playlistId) {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch playlist");

    const data = await response.json();
    return data.items.map((item) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      albumArt: item.track.album.images[0]?.url || null,
      previewUrl: item.track.preview_url,
      spotifyUrl: item.track.external_urls.spotify,
    }));
  } catch (error) {
    console.error("Playlist fetch error:", error);
    return null;
  }
}

// Fetch specific tracks by ID
async function fetchTracksByIds(trackIds) {
  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const ids = trackIds.join(",");
    const response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch tracks");

    const data = await response.json();
    return data.tracks.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      albumArt: track.album.images[0]?.url || null,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,
    }));
  } catch (error) {
    console.error("Tracks fetch error:", error);
    return null;
  }
}

// ============================================
// INTEGRATION WITH EXISTING PLAYER
// ============================================

let spotifyPlaylist = null;
let useSpotify = false;

// Initialize Spotify integration
async function initSpotifyPlayer() {
  // Check if Client ID is set
  if (!SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID === "YOUR_CLIENT_ID_HERE") {
    console.log("Spotify Client ID not set. Using fallback playlist.");
    return null;
  }

  // Try to fetch from playlist or track IDs
  if (SPOTIFY_PLAYLIST_ID) {
    spotifyPlaylist = await fetchPlaylistTracks(SPOTIFY_PLAYLIST_ID);
  } else if (SPOTIFY_TRACK_IDS.length > 0) {
    spotifyPlaylist = await fetchTracksByIds(SPOTIFY_TRACK_IDS);
  }

  if (spotifyPlaylist && spotifyPlaylist.length > 0) {
    useSpotify = true;
    console.log(`Loaded ${spotifyPlaylist.length} tracks from Spotify`);
    return spotifyPlaylist;
  }

  return null;
}

// Convert Spotify track to player format
function convertSpotifyTrack(track, index) {
  return {
    title: track.title,
    artist: track.artist,
    src: track.previewUrl || FALLBACK_PLAYLIST[index]?.src || null,
    albumArt: track.albumArt,
    spotifyUrl: track.spotifyUrl,
    isPreview: !!track.previewUrl && !track.previewUrl.includes("local"),
  };
}

// Get the final playlist (Spotify or fallback)
async function getPlaylist() {
  if (useSpotify && spotifyPlaylist) {
    return spotifyPlaylist.map((track, index) =>
      convertSpotifyTrack(track, index)
    );
  }
  return FALLBACK_PLAYLIST;
}

// Update album art in the UI
function updateAlbumArt(imageUrl) {
  const albumArtEl = document.querySelector(".album-art");
  if (albumArtEl && imageUrl) {
    albumArtEl.style.backgroundImage = `url(${imageUrl})`;
    albumArtEl.style.backgroundSize = "cover";
    albumArtEl.style.backgroundPosition = "center";
  }
}

// Export functions for use in musicPlayer.js
window.SpotifyPlayer = {
  init: initSpotifyPlayer,
  getPlaylist: getPlaylist,
  updateAlbumArt: updateAlbumArt,
  isUsingSpotify: () => useSpotify,
};

