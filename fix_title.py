import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace("Casa Chitic Balcescu", "Casa Chitic Boutique Hotel")

with open('index.html', 'w') as f:
    f.write(content)
