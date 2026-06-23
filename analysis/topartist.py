def get_top_artist(df):

    artist = (
        df["artist_name"]
        .value_counts()
        .idxmax()
    )

    return artist