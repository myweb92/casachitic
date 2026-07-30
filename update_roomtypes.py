import re

with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

# Requirement 2: Sizes
content = content.replace('title: "Deluxe Apartment",\n    collection: "JOHANN GOTT 7",\n    size: "50 m\\u00b2",', 'title: "Deluxe Apartment",\n    collection: "JOHANN GOTT 7",\n    size: "55 m\\u00b2",')

content = content.replace('title: "Deluxe Suite",\n    collection: "JOHANN GOTT 7",\n    size: "40 m\\u00b2",', 'title: "Deluxe Suite",\n    collection: "JOHANN GOTT 7",\n    size: "50 m\\u00b2",')

content = content.replace('title: "Deluxe Twin Room",\n    collection: "JOHANN GOTT 7",\n    size: "20 m\\u00b2",', 'title: "Deluxe Twin Room",\n    collection: "JOHANN GOTT 7",\n    size: "25 m\\u00b2",')

content = content.replace('title: "Deluxe Double Room",\n    collection: "JOHANN GOTT 7",\n    size: "20 m\\u00b2",', 'title: "Deluxe Double Room",\n    collection: "JOHANN GOTT 7",\n    size: "25 m\\u00b2",')


# Requirement 1: Rearrange images for Deluxe Double Room
double_room_pattern = r'''(title: "Deluxe Double Room".*?images: \[\s*)"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"(\s*\])'''

def double_room_replacement(m):
    prefix = m.group(1)
    img1 = m.group(2)
    img2 = m.group(3)
    img3 = m.group(4)
    img4 = m.group(5)
    suffix = m.group(6)
    
    # 3rd image as 1st image
    # Order becomes: img3, img1, img2, img4
    return f'{prefix}"{img3}",\n      "{img1}",\n      "{img2}",\n      "{img4}"{suffix}'

content = re.sub(double_room_pattern, double_room_replacement, content, flags=re.DOTALL)

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(content)
