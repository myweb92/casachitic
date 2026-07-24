import json

with open('final_rooms.json', 'r') as f:
    rooms = json.load(f)

# we will replace the ROOMS variable in src/components/RoomTypes.tsx
with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

import re
# Find the start of the ROOMS array
start = content.find('const ROOMS = [')
end = content.find('];', start) + 2

rooms_js = 'const ROOMS = [\n'
for r in rooms:
    rooms_js += f"""  {{
    title: {json.dumps(r['title'])},
    collection: {json.dumps(r['collection'])},
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
