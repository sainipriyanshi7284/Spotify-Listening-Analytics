
from app.listeninginsights import listening_insights
from app.soundcapsule import show_sound_capsule
from app.yearwrapped import plot_charts
from app.top5songs import show_top_songs
from utils.loader import load_data, load_all_years
from visualisations.artistchart import plot_artists



def show_menu():
    df1 = load_data("exports/Streaming_History_Audio_2026.json")
    df2 = load_data("exports/Streaming_History_Audio_2025.json")
    df3 = load_data("exports/Streaming_History_Audio_2024.json")
    df4 = load_data("exports/Streaming_History_Audio_2023.json")

    df_total = load_all_years(df1,df2,df3,df4)

    print("""🎵 SPOTIFY ANALYTICS
        1. All time wrapped
        2. Year wrapped
        3. Monthly Sound Capsule- Most recent year
        4. Exit)
            """)
    choice = 0
    while(choice!=4):
        print("\nEnter the choice to continue....")
        choice = input()

        if choice =="1":
            print("ALL TIME WRAPPED\n")
            listening_insights(df_total)
            show_top_songs(df_total)
            print("🎤 Top 5 Artists Chart\n")
            plot_artists(df_total)

        elif choice=="2":
            print("Of which year u need a wrap!!")
            choice2 = int(input())
            print(f"YEAR {choice2} WRAPPED\n")
            if(choice2==2026): df = df1 
            elif(choice2==2025): df = df2 
            elif(choice2==2024): df = df3 
            elif(choice2==2023): df = df4 
            else: print("Year not found!!")

            listening_insights(df)
            show_top_songs(df)
            plot_charts(df)

        elif choice=="3":
            show_sound_capsule(df1)

        else:
            print("EXITING....")
            break