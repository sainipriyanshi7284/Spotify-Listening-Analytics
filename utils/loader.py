import pandas as pd


def load_data(path):
    df = pd.read_json(path)

    return df