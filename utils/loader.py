import pandas as pd


def load_all_years(*files):

    return (
        pd.concat(
            files,
            ignore_index=True
        )
    )



def load_data(path):
    df = pd.read_json(path)

    return df



df= load_data("exports/Streaming_History_Audio_2026.json")

df = df.rename(
columns={
"ts":"timestamp",
"master_metadata_track_name":"track_name",
"master_metadata_album_artist_name":"artist_name"
}
)

df = (
    df[
        df["ms_played"] > 30000
    ]
)


print(df[[
"timestamp",
"track_name",
"artist_name",
"ms_played"
]].head(10))
