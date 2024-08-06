import requests
import random

print(random.choice(requests.get('https://raw.githubusercontent.com/robonamari/Good_Night-database/main/database.json').json()['links']))
