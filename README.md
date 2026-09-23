# Spotify Listening Analytics

Analyze your Spotify listening history to uncover insights, trends, and stats -- top artists, listening hours, monthly trends, and a personalized "sound capsule" -- all visualized through a web dashboard.

Built with Python (FastAPI, Pandas, Matplotlib) on the backend and a lightweight HTML/CSS/JS frontend.

---

## Live Demo

- Frontend: [https://spotify-analytics-two.vercel.app/](#) 
- Backend API: [https://spotify-listening-analytics-api.onrender.com/](#) 

Note: the backend is hosted on Render's free tier, so it may take 30-50 seconds to wake up after periods of inactivity.

---

## Features

- Upload your Spotify `Streaming_History_Audio_*.json` export files
- Discover your top artists and top songs
- See your listening habits broken down by hour of day
- View monthly listening trends over time
- Get a "Sound Capsule" -- a snapshot summary of your listening for a given year
- All-time and per-year insights, combined across multiple uploaded years

---

## Project Structure

```
Spotify-Listening-Analytics/
├── api/
│   └── main.py              # FastAPI app & API routes
├── analysis/                # Data analysis logic (summary, insights, top artist, etc.)
├── visualisations/           # Chart generation (matplotlib, returned as base64 images)
├── utils/
│   └── loader.py            # Loads & parses Spotify export JSON files
├── app/                      # CLI-based menu version (terminal analytics tool)
├── fronetnd/                 # Static frontend (HTML/CSS/JS) served separately
│   ├── index.html
│   ├── script.js
│   └── style.css
├── exports/                   # Sample/example Spotify export JSON files
├── main.py                   # Entry point for the CLI menu tool
└── requirements.txt
```

This project ships two ways to use it:
1. Web app -- FastAPI backend (`api/main.py`) + static frontend (`fronetnd/`)
2. CLI tool -- Terminal-based menu (`main.py` + `app/`) for local exploration

---

## Tech Stack

| Layer | Tools |
|---|---|
| Backend | FastAPI, Uvicorn, Pandas, Matplotlib |
| Frontend | HTML, CSS, JavaScript (no framework) |
| Data | Spotify's "Extended Streaming History" JSON export |
| Hosting | Render (backend), Vercel (frontend) |

---

## Getting Your Spotify Data

1. Go to your Spotify Privacy Settings (spotify.com/account/privacy)
2. Request "Extended streaming history"
3. Spotify will email you a `.zip` file within a few days (this can take up to 30 days)
4. Extract it -- you'll find files like `Streaming_History_Audio_2024.json`
5. Use these files to upload into the app

---

## Running Locally

### Backend

```bash
git clone https://github.com/sainipriyanshi7284/Spotify-Listening-Analytics.git
cd Spotify-Listening-Analytics
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn api.main:app --reload
```

The API will run at `http://127.0.0.1:8000`.

### Frontend

Open `fronetnd/index.html` directly in your browser, or serve it locally:

```bash
cd fronetnd
python -m http.server 5500
```

Then visit `http://127.0.0.1:5500`.

Make sure the `API` constant at the top of `script.js` points to wherever your backend is running (`http://127.0.0.1:8000` for local dev).

### CLI version

```bash
python main.py
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload a Spotify streaming history JSON file |
| GET | `/insights/alltime` | Combined insights across all uploaded years |
| GET | `/insights/{year}` | Insights for a specific year |
| GET | `/capsule/{year}` | Sound capsule summary for a year |
| GET | `/charts/artists/alltime` | Top artists chart (all-time) |
| GET | `/charts/artists/{year}` | Top artists chart (by year) |
| GET | `/charts/hour/alltime` | Listening-by-hour chart (all-time) |
| GET | `/charts/hour/{year}` | Listening-by-hour chart (by year) |
| GET | `/charts/monthly/{year}` | Monthly listening trend chart |

Charts are returned as base64-encoded images embedded in the JSON response.

---

## Deployment

- Backend: Deployed on Render as a Python web service
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
- Frontend: Deployed on Vercel as a static site
  - Root directory: `fronetnd`
  - No build step required

Note: uploaded data is stored in memory on the backend and is cleared whenever the server restarts.

---

## Notes and Limitations

- No database -- uploaded data only persists for the current server session
- Free-tier backend hosting means occasional cold-start delays
- This is a personal analytics tool, not affiliated with or endorsed by Spotify

---

## License

This project is open source and available for personal/educational use.
