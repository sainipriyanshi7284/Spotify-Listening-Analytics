import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt
from analysis.timeanalysis import listening_by_hour
import io
import base64

def plot_hour(df):
    count = listening_by_hour(df)

    plt.figure( figsize=(10,8))
    plt.bar(list(count.keys()), list(count.values()))
    plt.title( "Listening Activity By Hour ")
    plt.xlabel("Hour of the day" )
    plt.ylabel("No of songs")
    plt.xticks(range(0,24))

    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    img = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    return img

  