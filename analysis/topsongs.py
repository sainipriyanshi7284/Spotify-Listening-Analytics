import pandas as pd

def get_top_songs(df):

    songs = (
        df["master_metadata_track_name"]
        .value_counts()
        .head(5)
    )

    return songs.to_dict()