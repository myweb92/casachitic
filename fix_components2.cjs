const fs = require('fs');

let aboutUs = fs.readFileSync('src/components/AboutUs.tsx', 'utf8');
aboutUs = aboutUs.replace(/\{\s*en:\s*('[^']+'),\s*ro:\s*'[^']+'\s*\}/g, '$1');
fs.writeFileSync('src/components/AboutUs.tsx', aboutUs);

let photoGallery = fs.readFileSync('src/components/PhotoGallery.tsx', 'utf8');
photoGallery = photoGallery.replace(/\{\s*en:\s*('[^']+'),\s*ro:\s*'[^']+'\s*\}/g, '$1');
fs.writeFileSync('src/components/PhotoGallery.tsx', photoGallery);
