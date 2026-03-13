import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "spotify-mood-secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        sameSite: "none",
        httpOnly: true,
      },
    })
  );

  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const APP_URL = process.env.APP_URL || `https://${process.env.VITE_URL || 'localhost:3000'}`;
  const REDIRECT_URI = `${APP_URL}/auth/spotify/callback`;

  // Helper to refresh token
  const refreshSpotifyToken = async (req: express.Request) => {
    const refreshToken = (req.session as any).spotifyRefreshToken;
    if (!refreshToken) throw new Error("No refresh token available");

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      const { access_token, refresh_token: new_refresh_token } = response.data;
      (req.session as any).spotifyAccessToken = access_token;
      if (new_refresh_token) {
        (req.session as any).spotifyRefreshToken = new_refresh_token;
      }
      return access_token;
    } catch (error: any) {
      console.error("Token refresh failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // API Routes
  app.get("/api/auth/spotify/url", (req, res) => {
    if (!SPOTIFY_CLIENT_ID) {
      return res.status(500).json({ error: "Spotify Client ID not configured" });
    }

    const scope = "user-read-private user-read-email user-library-read user-top-read user-modify-playback-state user-read-playback-state";
    const params = new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      show_dialog: "true",
    });

    res.json({ url: `https://accounts.spotify.com/authorize?${params.toString()}` });
  });

  app.get("/auth/spotify/callback", async (req, res) => {
    const code = req.query.code as string;

    if (!code) {
      return res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage({ type: 'SPOTIFY_AUTH_ERROR', error: 'No code provided' }, '*');
              window.close();
            </script>
          </body>
        </html>
      `);
    }

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      
      // Store in session (in a real app, you'd use a database)
      (req.session as any).spotifyAccessToken = access_token;
      (req.session as any).spotifyRefreshToken = refresh_token;

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'SPOTIFY_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("Spotify token exchange error:", error.response?.data || error.message);
      res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage({ type: 'SPOTIFY_AUTH_ERROR', error: 'Failed to exchange token' }, '*');
              window.close();
            </script>
          </body>
        </html>
      `);
    }
  });

  app.get("/api/auth/spotify/status", (req, res) => {
    const connected = !!(req.session as any).spotifyAccessToken;
    res.json({ connected });
  });

  app.get("/api/spotify/me", async (req, res) => {
    let token = (req.session as any).spotifyAccessToken;
    if (!token) {
      return res.status(401).json({ error: "Not connected to Spotify" });
    }

    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.json(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          token = await refreshSpotifyToken(req);
          const retryResponse = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.json(retryResponse.data);
        } catch (refreshError) {
          return res.status(401).json({ error: "Session expired" });
        }
      }
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch profile" });
    }
  });

  app.get("/api/spotify/playlists", async (req, res) => {
    let token = (req.session as any).spotifyAccessToken;
    if (!token) {
      return res.status(401).json({ error: "Not connected to Spotify" });
    }

    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: "Query required" });

    const fetchPlaylists = async (accessToken: string) => {
      return axios.get("https://api.spotify.com/v1/search", {
        params: { q: query, type: "playlist", limit: 12 },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    };

    try {
      const response = await fetchPlaylists(token);
      res.json(response.data.playlists);
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          token = await refreshSpotifyToken(req);
          const retryResponse = await fetchPlaylists(token);
          return res.json(retryResponse.data.playlists);
        } catch (refreshError) {
          return res.status(401).json({ error: "Session expired" });
        }
      }
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch playlists" });
    }
  });

  app.put("/api/spotify/play", async (req, res) => {
    let token = (req.session as any).spotifyAccessToken;
    if (!token) {
      return res.status(401).json({ error: "Not connected to Spotify" });
    }

    const { uri } = req.body;
    if (!uri) return res.status(400).json({ error: "URI required" });

    const playTrack = async (accessToken: string) => {
      return axios.put(
        "https://api.spotify.com/v1/me/player/play",
        { uris: [uri] },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    };

    try {
      await playTrack(token);
      res.json({ success: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          token = await refreshSpotifyToken(req);
          await playTrack(token);
          return res.json({ success: true });
        } catch (refreshError) {
          return res.status(401).json({ error: "Session expired" });
        }
      }
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to play" });
    }
  });

  app.put("/api/spotify/pause", async (req, res) => {
    let token = (req.session as any).spotifyAccessToken;
    if (!token) return res.status(401).json({ error: "Not connected" });

    try {
      await axios.put("https://api.spotify.com/v1/me/player/pause", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      res.json({ success: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        token = await refreshSpotifyToken(req);
        await axios.put("https://api.spotify.com/v1/me/player/pause", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return res.json({ success: true });
      }
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to pause" });
    }
  });

  app.put("/api/spotify/resume", async (req, res) => {
    let token = (req.session as any).spotifyAccessToken;
    if (!token) return res.status(401).json({ error: "Not connected" });

    try {
      await axios.put("https://api.spotify.com/v1/me/player/play", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      res.json({ success: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        token = await refreshSpotifyToken(req);
        await axios.put("https://api.spotify.com/v1/me/player/play", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return res.json({ success: true });
      }
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to resume" });
    }
  });

  app.post("/api/auth/spotify/logout", (req, res) => {
    (req.session as any).spotifyAccessToken = null;
    (req.session as any).spotifyRefreshToken = null;
    res.json({ success: true });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
