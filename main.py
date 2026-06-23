from app.menu import show_menu
from utils.loader import load_data

df = load_data("exports/sample_data.json")

show_menu(df)

