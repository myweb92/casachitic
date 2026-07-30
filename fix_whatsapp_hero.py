import re

with open('src/components/HeroCarousel.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '''              <a
                className="text-hotel-beige hover:text-hotel-gold transition-colors"
                aria-label="WhatsApp"
              >''',
    '''              <a
                href="https://wa.me/40720331144"
                target="_blank"
                rel="noreferrer"
                className="text-hotel-beige hover:text-hotel-gold transition-colors"
                aria-label="WhatsApp"
              >'''
)

with open('src/components/HeroCarousel.tsx', 'w') as f:
    f.write(content)
