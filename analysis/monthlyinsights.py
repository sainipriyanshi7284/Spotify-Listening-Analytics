import pandas as pd


def listening_by_month(df):

    df["ts"] = (
        pd.to_datetime(
            df["ts"]
        )
    )

    df["month"] = (
        df["ts"]
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

    return counts.to_dict()