import pandas as pd

def listening_by_hour(df):

    df["timestamp"] = (
        pd.to_datetime(
            df["timestamp"]
        )
    )

    counts = (
        df["timestamp"]
        .dt.hour
        .value_counts()
        .sort_index()
    )


    return counts