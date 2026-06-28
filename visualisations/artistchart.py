import matplotlib
matplotlib.use('Agg')  

import matplotlib.pyplot as plt
import io
import base64

def plot_artists(df):
    
    counts = ( df["master_metadata_album_artist_name"].value_counts().head(5) )
    plt.figure( figsize=(10,8))
    plt.barh( counts.index, counts.values )
    plt.title( "Top 5 Artists")
    plt.ylabel("Artist" )
    plt.xlabel("Plays")

    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    img = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()
    
    return img