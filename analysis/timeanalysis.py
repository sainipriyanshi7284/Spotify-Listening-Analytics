import pandas as pd

def listening_by_hour(df):

    df["ts"] = (
        pd.to_datetime(
            df["ts"]
        )
    )

    counts = (
        df["ts"]
        .dt.hour
        .value_counts()
        .sort_index()
    )


    return counts.to_dict()