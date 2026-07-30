import re

with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"',
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-fr"'
)

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(content)
