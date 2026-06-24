def get_summary(df):

    total_minutes = float(df["ms_played"].sum()/60000)

    total_tracks = int(df["master_metadata_track_name"].count())

    total_artists = int(df["master_metadata_album_artist_name"].nunique())

    return {
        "minutes": total_minutes,
        "tracks": total_tracks,
        "artists": total_artists
    }