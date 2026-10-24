import random

import requests  # pip install requests

print(
    random.choice(
        requests.get("https://good-night-database.robonamari.ir/database.json").json()[
            "texts"
        ]
    )
)

# or

print(
    random.choice(
        requests.get("https://good-night-database.robonamari.ir/database.json").json()[
            "gifs"
        ]
    )
)
