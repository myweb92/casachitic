const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Replace {lang === 'ro' ? 'ro string' : 'en string'} with 'en string'
  // It looks like `lang === 'ro' ? '...' : '...'`
  content = content.replace(/lang\s*===\s*'ro'\s*\?\s*(`[^`]*`|'[^']*'|"[^"]*")\s*:\s*(`[^`]*`|'[^']*'|"[^"]*")/g, '$2');
  
  // Replace {lang === 'en' ? 'en string' : 'ro string'} with 'en string'
  content = content.replace(/lang\s*===\s*'en'\s*\?\s*(`[^`]*`|'[^']*'|"[^"]*")\s*:\s*(`[^`]*`|'[^']*'|"[^"]*")/g, '$1');

  // Replace item.title[lang] with item.title
  content = content.replace(/\[lang\]/g, '');

  fs.writeFileSync(path.join(dir, file), content);
}

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/\[lang\]/g, '');
fs.writeFileSync('src/App.tsx', app);
