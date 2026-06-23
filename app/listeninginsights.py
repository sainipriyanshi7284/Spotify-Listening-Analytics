
from analysis.summary import get_summary
from analysis.topartist import get_top_artist

from analysis.timeanalysis import listening_by_hour

from analysis.insights import generate_insights





def listening_insights(df):
    summary = get_summary(df)
    top_artist = get_top_artist(df)
    hours = listening_by_hour(df)
    insight = generate_insights(df,summary,top_artist,hours)



    print("\nLISTENING INSIGHTS🎶")
    print(insight)
    print("")
    





