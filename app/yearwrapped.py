from utils.loader import load_data
from visualisations.hourchart import plot_hour
from visualisations.monthlytrends import plot_monthly_trends
from visualisations.artistchart import plot_artists

def plot_charts(df):
    print("🎤 Top 5 Artists Chart\n")
    plot_artists(df)

    print("⏰ Listening By Hour Chart\n")
    plot_hour(df)

    print("📈 Monthly Trend\n")
    plot_monthly_trends(df)