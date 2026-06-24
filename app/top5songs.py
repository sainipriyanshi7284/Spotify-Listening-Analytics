from analysis.topsongs import get_top_songs

def show_top_songs(df):
    songs= get_top_songs(df)

    print("TOP 5 SONGS:🎶 \n ")

    for song,count in songs.items():
        print(f"{song} -> {count} plays")