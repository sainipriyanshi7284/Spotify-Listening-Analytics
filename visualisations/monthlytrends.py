import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt
from analysis.monthlyinsights import listening_by_month
import io
import base64

def plot_monthly_trends(df):
    
    counts = listening_by_month(df)
    plt.figure( figsize=(10,8))
    plt.plot(list(counts.keys()), list(counts.values()))
    plt.title( "Monthly Trends")
    plt.ylabel("Songs Played " )
    plt.xlabel("Months")
   
    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    img = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    return img



