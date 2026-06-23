import matplotlib.pyplot as plt
from analysis.timeanalysis import listening_by_hour

def plot_hour(df):
    count = listening_by_hour(df)

    plt.figure( figsize=(10,8))
    plt.bar( count.index, count.values )
    plt.title( "Listening Activity By Hour ")
    plt.xlabel("Hour of the day" )
    plt.ylabel("No of songs")
    plt.xticks(range(0,24))

   # plt.savefig("artist_chart.png")
    plt.show()
