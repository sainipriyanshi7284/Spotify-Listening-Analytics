def get_top_artist(df):

    artist = (
        df["master_metadata_album_artist_name"]
        .value_counts()
        .idxmax()
    )

    return artist