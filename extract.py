import json
import re

with open('cloudbeds.html', 'r') as f:
    content = f.read()

# find all json blobs inside <script type="application/ld+json">
matches = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)

rooms = []
for m in matches:
    try:
        data = json.loads(m)
        if isinstance(data, list):
            for item in data:
                if item.get('@type') == 'HotelRoom':
                    rooms.append(item)
        elif isinstance(data, dict):
            if 'containsPlace' in data:
                for place in data['containsPlace']:
                    if place.get('@type') == 'HotelRoom':
                        rooms.append(place)
    except Exception as e:
        pass

out = []
for room in rooms:
    name = room.get('name', [{}])[0].get('@value', '')
    desc = room.get('description', [{}])[0].get('@value', '')
    images = room.get('image', [])
    out.append({
        'title': name,
        'description': desc,
        'images': images
    })
print(json.dumps(out, indent=2))
