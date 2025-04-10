<div align="center">

[**Other Languages**](.github/README/)

</div>

<p align="center">
    <img src="https://img.shields.io/github/languages/code-size/robonamari/Good_Night-database?style=flat" alt="Code Size">
    <img src="https://tokei.rs/b1/github/robonamari/Good_Night-database?style=flat" alt="Total lines">
    <img src="https://img.shields.io/badge/all%20languages-all%20Versions-blue" alt="All Versions">
    <img src="https://img.shields.io/github/license/robonamari/Good_Night-database" alt="GitHub license">
</p>

---

This project contains a collection of Iranian good night messages presented in a JSON file. This collection can be utilized in various applications and services to display content to users.

## Features

- Fetching content from an online JSON database.
- Only contains short links for quick access.

| Picture | Video | Text | Gif | total |
| :-----: | :---: | :--: | :-: | :---: |
|   :x:   |  :x:  |  20  | 32  |  52   |

## Help

An exmaple to gather links with python:

```python
import random

import requests  # pip install requests==2.32.3

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
```

## Sources

- [MoonFall Discord Server](https://discord.gg/BsaC3QgEQz)
