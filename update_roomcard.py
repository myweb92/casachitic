import re

with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

replacement = """        <h3 className="font-serif text-2xl md:text-3xl text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300 mb-1">
          {room.title.includes(" - No Window") ? (
            <div className="flex items-baseline flex-wrap sm:flex-nowrap whitespace-nowrap">
              <span>{room.title.replace(" - No Window", "")}</span>
              <span className="text-lg md:text-xl ml-2">- No Window</span>
            </div>
          ) : (
            room.title
          )}
        </h3>"""

content = re.sub(
    r'<h3 className="font-serif text-2xl md:text-3xl text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300 mb-1">\s*\{room\.title\}\s*</h3>',
    replacement,
    content
)

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(content)

