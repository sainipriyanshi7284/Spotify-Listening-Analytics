import pandas as pd


def listening_by_month(df):

    df["timestamp"] = (
        pd.to_datetime(
            df["timestamp"]
        )
    )

    df["month"] = (
        df["timestamp"]
        .dt.strftime("%b")
    )

    months_order = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    df["month"] = pd.Categorical(
        df["month"],
        categories=months_order,
        ordered=True
    )

    counts = (
        df["month"]
        .value_counts()
        .sort_index()
    )

    counts =(counts[counts>0])

    return counts