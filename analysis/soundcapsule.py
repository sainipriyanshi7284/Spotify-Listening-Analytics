import pandas as pd

def sound_capsule(df):
        
    df["timestamp"] = (
        pd.to_datetime(
            df["timestamp"]
        )
    )

    df["month"] = (
        df["timestamp"]
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
        track = (month_df["track_name"].value_counts().idxmax())
        artist = (month_df["artist_name"].value_counts().idxmax())

        result[month] = {
            "Minutes": round(minute,1),
            "Top-Track": track,
            "Top- Artist": artist
        }

    return result