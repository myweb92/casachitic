const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

// I'll just use a regex to comment out or remove the apartments and deluxe-double items from the array.
// But it's easier to just do it via a quick AST or string split.
// Let's do a string replace for those objects, or simply write a quick TS script that loads the module. Wait, I can't easily write it back.
