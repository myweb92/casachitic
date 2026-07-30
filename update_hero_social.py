import re

with open('src/components/HeroCarousel.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'aria-label="Facebook"\n              >\n                <Facebook className="w-4 h-4" />',
    'aria-label="Facebook"\n                href={CONTACT_INFO.facebookUrl}\n                target="_blank"\n                rel="noreferrer"\n              >\n                <Facebook className="w-4 h-4" />'
)
# Wait, let's just do it with replace carefully

content = re.sub(
    r'<a\s+href="#"\s+className="text-hotel-beige hover:text-hotel-gold transition-colors"\s+aria-label="Facebook"\s*>',
    r'<a\n                href={CONTACT_INFO.facebookUrl}\n                target="_blank"\n                rel="noreferrer"\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Facebook"\n              >',
    content
)

content = re.sub(
    r'<a\s+href="#"\s+className="text-hotel-beige hover:text-hotel-gold transition-colors"\s+aria-label="Instagram"\s*>',
    r'<a\n                href={CONTACT_INFO.instagramUrl}\n                target="_blank"\n                rel="noreferrer"\n                className="text-hotel-beige hover:text-hotel-gold transition-colors"\n                aria-label="Instagram"\n              >',
    content
)

with open('src/components/HeroCarousel.tsx', 'w') as f:
    f.write(content)
