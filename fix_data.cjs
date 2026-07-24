const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Use regex to replace `{ en: '...', ro: '...' }` with `'...'`
// This regex matches properties like `title: { en: '...', ro: '...' }`
// It handles single and double quotes, and template literals (partially).
// Actually, it's safer to use an AST parser or a very careful regex.

// Let's use a simpler regex that matches { en: <string>, ro: <string> }
// Because it can span multiple lines, let's just do it with replacing /\{\s*en:\s*(`.*?`|'.*?'|".*?"),\s*ro:\s*(`.*?`|'.*?'|".*?")\s*\}/gs with the english part.

data = data.replace(/\{\s*en:\s*(`[^`]*`|'[^']*'|"[^"]*"),\s*ro:\s*(`[^`]*`|'[^']*'|"[^"]*")\s*\}/gs, '$1');

// For arrays like amenities: { en: [...], ro: [...] }
data = data.replace(/\{\s*en:\s*(\[.*?\]),\s*ro:\s*(\[.*?\])\s*\}/gs, '$1');

fs.writeFileSync('src/data.ts', data);
