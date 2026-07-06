import matplotlib

import matplotlib.pyplot as plt
from analysis.timeanalysis import listening_by_hour
import io
import base64

def plot_hour(df,return_base64 =False):
    count = listening_by_hour(df)

    plt.figure( figsize=(10,8))
    plt.bar(list(count.keys()), list(count.values()),color='g')
    plt.title( "Listening Activity By Hour ")
    plt.xlabel("Hour of the day" )
    plt.ylabel("No of songs")
    plt.xticks(range(0,24))

    if return_base64:
        matplotlib.use('Agg')  
        buf = io.BytesIO()
        plt.savefig(buf, format="png", bbox_inches="tight")
        buf.seek(0)
        img = base64.b64encode(buf.read()).decode("utf-8")
        plt.close()
        
        return img
    else:
        plt.show()

  