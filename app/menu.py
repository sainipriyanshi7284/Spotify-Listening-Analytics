
from app.listeninginsights import listening_insights
from app.soundcapsule import show_sound_capsule
from app.yearwrapped import plot_charts

def show_menu(df):
    print("""🎵 SPOTIFY ANALYTICS
        1. All time wrapped
        2. Year wrapped
        3. Monthly Sound Capsule
        4. Exit)
            """)
    choice = 0
    while(choice!=4):
        choice = input()

        if choice =="1":
            print("ALL TIME WRAPPED\n")
            listening_insights(df)

        elif choice=="2":
            print("YEAR WRAPPED\n")
            listening_insights(df)

            plot_charts(df)

        elif choice=="3":
            show_sound_capsule(df)

        else:
            print("EXITING....")
            break