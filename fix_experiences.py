import re

with open('src/components/Experiences.tsx', 'r') as f:
    content = f.read()

content = content.replace("Wine, Car", "Flower, Car")
content = content.replace("<Wine", "<Flower")
content = content.replace("badge: 'GOURMET'", "badge: 'COMING AUG 2027'")
content = content.replace("title: 'Premium Minibar'", "title: 'Luxury SPA Center'")
content = content.replace("desc: 'Enjoy a curated selection of fine beverages and gourmet snacks thoughtfully stocked in your room.'", "desc: 'A sanctuary for body and mind. Currently undergoing restoration, our high-end wellness SPA will open in late summer 2027.'")

with open('src/components/Experiences.tsx', 'w') as f:
    f.write(content)
