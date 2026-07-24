import json

with open('final_rooms.json', 'r') as f:
    rooms = json.load(f)

# Keep only the 3 specific rooms based on their original index/title
rooms_to_keep = []
for r in rooms:
    if r['title'] == 'Twin Budget Room - Nicolae Balcescu 13':
        r['title'] = 'Twin Budget Room'
        rooms_to_keep.append(r)
    elif r['title'] == 'Double Budget Room - Nicolae Balcescu 13':
        r['title'] = 'Double Budget Room'
        rooms_to_keep.append(r)
    elif r['title'] == 'Deluxe Single Room - Nicolae Balcescu 13':
        r['title'] = 'Deluxe Single Room'
        rooms_to_keep.append(r)

# order should be Twin, Double, Single
order = ['Twin Budget Room', 'Double Budget Room', 'Deluxe Single Room']
rooms_to_keep = sorted(rooms_to_keep, key=lambda x: order.index(x['title']))

# we will replace the ROOMS variable in src/components/RoomTypes.tsx
with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

import re
# Find the start of the ROOMS array
start = content.find('const ROOMS = [')
end = content.find('];', start) + 2

rooms_js = 'const ROOMS = [\n'
for r in rooms_to_keep:
    rooms_js += f"""  {{
    title: {json.dumps(r['title'])},
    collection: {json.dumps(r['collection'].replace('NICOLAE BALCESCU 13', 'ECONOMY COLLECTION') if 'Budget' in r['title'] else 'DELUXE COLLECTION')},
    size: {json.dumps(r['size'])},
    capacity: {json.dumps(r['capacity'])},
    bed: {json.dumps(r['bed'])},
    description: {json.dumps(r['description'])},
    badge: {json.dumps(r['badge'])},
    images: {json.dumps(r['images'], indent=6).replace('      "', '      "').replace('    ]', '    ]')}
  }},\n"""
rooms_js += '];'

new_content = content[:start] + rooms_js + content[end:]

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(new_content)
