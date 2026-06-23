import matplotlib.pyplot as plt
from analysis.monthlyinsights import listening_by_month

def plot_monthly_trends(df):
    
    counts = listening_by_month(df)
    plt.figure( figsize=(10,8))
    plt.plot( counts.index, counts.values )
    plt.title( "Monthly Trends")
    plt.ylabel("Songs Played " )
    plt.xlabel("Months")
   # plt.savefig("artist_chart.png")
    plt.show()


