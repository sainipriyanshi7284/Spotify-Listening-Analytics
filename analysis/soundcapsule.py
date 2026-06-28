import pandas as pd

def sound_capsule(df):
        
    df["ts"] = (
        pd.to_datetime(
            df["ts"]
        )
    )

    df["month"] = (
        df["ts"]
        .dt.strftime("%B")
    )

    result = {}

    months = (
        df["month"]
        .unique()
    )

    for month in months:
        month_df=(df[df["month"]==month])
        minute = float(month_df["ms_played"].sum()/60000)
        track = (month_df["master_metadata_track_name"].value_counts().idxmax())
        artist = (month_df["master_metadata_album_artist_name"].value_counts().idxmax())

        result[month] = {
            "Minutes": round(minute,1),
            "Top-Track": track,
            "Top-Artist": artist
        }

    return result