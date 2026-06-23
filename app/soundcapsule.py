from analysis.soundcapsule import sound_capsule

def show_sound_capsule(df):
    capsule = sound_capsule(df)

    print("\nSOUND CAPSULE 🎼")
    for month, data in capsule.items():
        print(f"""
        {month}😊

        Minutes:  {data["Minutes"]} min
        Top Track:  {data["Top-Track"]}
        Top Artist: {data["Top- Artist"]}
        ------------------ """)
