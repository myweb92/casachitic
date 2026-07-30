import re

with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

old_images = '''    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a32839f156df.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283b3a751d.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283b435512.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-3~~6a3283b628c43.jpg",
    ],'''

new_images = '''    images: [
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283b435512.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a32839f156df.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283b3a751d.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-3~~6a3283b628c43.jpg",
    ],'''

content = content.replace(old_images, new_images)

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(content)
