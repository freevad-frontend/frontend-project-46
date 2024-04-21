const path = require('path');
const fs = require('fs');

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileExt = path.extname(filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileExt}`);
  }
};

module.exports = parse;