
def generate_insights( df,summary, top_artist, hours):

    max_count = max(hours.values())  
    peak_hour = [h for h, count in hours.items() if count == max_count]
    peak_text = ", ".join(f"{h}:00"
    for h in peak_hour)
    
    return {
    "total_minutes":round(summary["minutes"],1),
    "total_tracks": summary["tracks"],
    "total_artists":summary["artists"],
    "top_artist": top_artist,
    "peak_hour": peak_text
    }
