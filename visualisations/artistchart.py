import matplotlib.pyplot as plt

def plot_artists(df):
    
    counts = ( df["artist_name"].value_counts().head(5) )
    plt.figure( figsize=(10,8))
    plt.barh( counts.index, counts.values )
    plt.title( "Top 5 Artists")
    plt.ylabel("Artist" )
    plt.xlabel("Plays")
   # plt.savefig("artist_chart.png")
    plt.show()