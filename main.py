import requests
import random

print(random.choice(requests.get("https://good-night-database.robonamari.ir/database.json").json()["messages"]))