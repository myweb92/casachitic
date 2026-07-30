import re

with open('src/components/HeroCarousel.tsx', 'r') as f:
    content = f.read()

content = content.replace('href="#"\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Facebook"\n                href={CONTACT_INFO.facebookUrl}', 
                          'href={CONTACT_INFO.facebookUrl}\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Facebook"')
                          
content = content.replace('href="#"\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Instagram"\n                href={CONTACT_INFO.instagramUrl}', 
                          'href={CONTACT_INFO.instagramUrl}\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Instagram"')

with open('src/components/HeroCarousel.tsx', 'w') as f:
    f.write(content)
