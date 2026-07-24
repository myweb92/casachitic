import re

with open('src/components/HeroCarousel.tsx', 'r') as f:
    content = f.read()

old_btn = """<button
                onClick={() => scrollToSection('rooms')}
                className="ml-2 bg-hotel-gold text-hotel-charcoal px-4 py-2 text-xs font-semibold tracking-wider rounded-sm hover:bg-white transition-colors"
              >
                BOOK NOW
              </button>"""

new_btn = """<a
                href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center justify-center bg-hotel-gold text-hotel-charcoal px-4 py-2 text-xs font-semibold tracking-wider rounded-sm hover:bg-white transition-colors"
              >
                BOOK NOW
              </a>"""

content = content.replace(old_btn, new_btn)

with open('src/components/HeroCarousel.tsx', 'w') as f:
    f.write(content)

