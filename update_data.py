import re

with open('src/data.ts', 'r') as f:
    content = f.read()

# 1. Update image imports
content = content.replace("import download1 from '../assets/download1.jpeg';", "import headerImg from '../assets/Header.jpeg';")
content = content.replace("image: download1,", "image: headerImg,")

content = content.replace("import brasov from '../assets/brasov.webp';", "import oldbrasov from '../assets/oldbrasov.png';")
content = content.replace("imageHillside: brasov,", "imageHillside: oldbrasov,")

# 2. Update social links
content = content.replace("facebookUrl: 'https://facebook.com/casachitic'", "facebookUrl: 'https://www.facebook.com/casachitic/?locale=ro_RO'")
content = content.replace("instagramUrl: 'https://instagram.com/casachitic'", "instagramUrl: 'https://www.instagram.com/casachitic.brasov/'")

with open('src/data.ts', 'w') as f:
    f.write(content)
