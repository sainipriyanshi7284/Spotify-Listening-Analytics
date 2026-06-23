
def generate_insights( df,summary, top_artist, hours):

    max_count = hours.max()

    peak_hour = (hours[
        hours==max_count
        ].index.tolist())
    peak_text = ", ".join(f"{h}:00"
    for h in peak_hour)
    
    result = f"""
    Total Listening:{summary["minutes"]:.1f} min
    Tracks: {summary["tracks"]}
    Artists:{summary["artists"]}
    Top Artist: {top_artist}
    Peak Listening Hour: {peak_text}"""
    return result