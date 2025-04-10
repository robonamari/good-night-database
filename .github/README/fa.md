<div align="center">

[**🇺🇸 English**](../../README.md)

</div>

<p align="center">
    <img src="https://img.shields.io/github/languages/code-size/robonamari/Good_Night-database?style=flat" alt="Code Size">
    <img src="https://tokei.rs/b1/github/robonamari/Good_Night-database?style=flat" alt="Total lines">
    <img src="https://img.shields.io/badge/all%20languages-all%20Versions-blue" alt="All Versions">
    <img src="https://img.shields.io/github/license/robonamari/Good_Night-database" alt="GitHub license">
</p>

---

این پروژه شامل مجموعه ای از شب بخیر های ایرانی است که در قالب یک فایل JSON ارائه شده اند. این مجموعه می تواند در برنامه ها و سرویس های مختلف برای نمایش به کاربران استفاده شود.

## ویژگی ها

- دریافت محتوا از یک پایگاه داده آنلاین JSON.
- شامل فقط لینک های کوتاه برای دسترسی سریع.

| عکس | ویدیو | متن | گیف | کل  |
| :-: | :---: | :-: | :-: | :-: |
| :x: |  :x:  | 20  | 32  | 52  |

## کمک

نمونه ای برای دریافت لینک ها به زبان پایتون:

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

## منابع

- [سرور سقوط ماه در دیسکورد](https://discord.gg/BsaC3QgEQz)
