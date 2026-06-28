from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import pandas as pd

from utils.loader import load_data
from analysis.summary import get_summary
from analysis.topartist import get_top_artist
from analysis.timeanalysis import listening_by_hour
from analysis.insights import generate_insights
from analysis.soundcapsule import sound_capsule
from visualisations.artistchart import plot_artists
from visualisations.hourchart import plot_hour
from visualisations.monthlytrends import plot_monthly_trends

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

df_store={}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    df = load_data(tmp_path)
    os.unlink(tmp_path)
    year = pd.to_datetime(df["ts"]).dt.year.mode()[0]
    df_store[int(year)] = df
        
    return {"status": "success", "year": int(year)}


@app.get("/insights/{year}")
def insights(year:int):
    df = df_store.get(year)

    if df is None:
        return {"error": f"No data found for {year}. Please upload file first!"}
    
    summary = get_summary(df)
    top_artist = get_top_artist(df)
    hours = listening_by_hour(df)
    return generate_insights(df, summary, top_artist, hours)


@app.get("/capsule/{year}")
def capsule(year:int):
    df = df_store.get(year)
    if df is None:
        return {"error": f"No data found for {year}. Please upload file first!"}
    return sound_capsule(df)


@app.get("/charts/artists/{year}")
def artists_chart(year:int):
    df = df_store.get(year)
    if df is None:
        return {"error": f"No data found for {year}. Please upload file first!"}
    img = plot_artists(df)
    return {"chart": img}


@app.get("/charts/hour/{year}")
def hour_chart(year:int):
    df = df_store.get(year)
    if df is None:
        return {"error": f"No data found for {year}. Please upload file first!"}
    img = plot_hour(df)
    return {"chart": img}


@app.get("/charts/monthly/{year}")
def monthly_chart(year:int):
    df = df_store.get(year)
    if df is None:
        return {"error": f"No data found for {year}. Please upload file first!"}
    img = plot_monthly_trends(df)
    return {"chart": img}
