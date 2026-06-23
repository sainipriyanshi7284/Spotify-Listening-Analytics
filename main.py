from utils.loader import load_data
from analysis.summary import get_summary
from analysis.topartist import get_top_artist
from visualisations.artistchart import plot_artists
from analysis.timeanalysis import listening_by_hour
from visualisations.hourchart import plot_hour
from analysis.insights import generate_insights
from analysis.monthlyinsights import listening_by_month
from visualisations.monthlytrends import plot_monthly_trends


df = load_data("exports/sample_data.json")
summary = get_summary(df)
top_artist = get_top_artist(df)
hours = listening_by_hour(df)
insight = generate_insights(df,summary,top_artist,hours)
monthly_trend = listening_by_month(df)

# print("----SUMMARY----")
# print(summary)
# print("\nTop artist: ")
# print(top_artist)
print("\nLISTENING INSIGHTS🎶")
print(insight)
print("")
print(monthly_trend)
plot_artists(df)
plot_hour(df)
plot_monthly_trends(df)



