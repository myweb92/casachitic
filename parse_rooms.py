import json

with open('rooms.json', 'r') as f:
    rooms = json.load(f)

# we want to map this to the format:
# {
#   title: '...',
#   collection: '...',
#   size: '25 m²', // guess or default
#   capacity: '2 Adults', // guess or default
#   bed: '...',
#   description: '...',
#   badge: '...',
#   images: [...]
# }

out = []
for i, room in enumerate(rooms):
    title = room['title'].strip()
    
    # Simple heuristics
    collection = "JOHANN GOTT 7" if "Johann Gott 7" in title else "NICOLAE BALCESCU 13"
    
    # Capacity
    cap = "2 Adults"
    if "Single" in title:
        cap = "1 Adult"
    elif "Apartment" in title or "Suite" in title:
        cap = "2-4 Adults"
        
    # Bed
    bed = "1 Double Bed"
    if "Twin" in title:
        bed = "2 Single Beds"
    elif "Single" in title:
        bed = "1 Single Bed"
    elif "Apartment" in title:
        bed = "1 Double Bed & Sofa"
    
    # size
    size = "20 m²"
    if "Apartment" in title:
        size = "50 m²"
    elif "Suite" in title:
        size = "40 m²"
    elif "Budget" in title:
        size = "25 m²"
    
    # badge
    badges = ["BEST SELLER", "POPULAR", "SOLO", "COUPLES", "LUXURY", "FAMILY", "PREMIUM", "BOUTIQUE", "COZY", "QUIET"]
    badge = badges[i % len(badges)]
    
    title_short = title.replace(" - Nicolae Balcescu 13", "").replace(" - Johann Gott 7", "")
    
    out.append({
        "title": title,
        "collection": collection,
        "size": size,
        "capacity": cap,
        "bed": bed,
        "description": room['description'].strip(),
        "badge": badge,
        "images": room['images'][:4] # limit to 4 images
    })

print(json.dumps(out, indent=2))
