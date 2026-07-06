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

    df = (df[ df["ms_played"] > 30000 ] )
    
    return df

