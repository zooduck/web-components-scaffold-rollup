const fs = require('fs');
const args = process.argv.slice(2);
const [src, dest] = args;

fs.copyFileSync(src, dest);