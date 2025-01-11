import requests
import random

print(random.choice(requests.get("https://good-night-database.robonamari.com/database.json").json()["messages"]))
# or
print(random.choice(requests.get("https://good-night-database.robonamari.com/database.json").json()["gifs"]))