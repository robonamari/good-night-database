import random

import requests  # pip install requests

print(
random.choice(
    requests.get("https://good-night-database.robonamari.com/database.json").json()[
        "texts"
    ]
)
)

# or

print(
random.choice(
    requests.get("https://good-night-database.robonamari.com/database.json").json()[
        "gifs"
    ]
)
)
