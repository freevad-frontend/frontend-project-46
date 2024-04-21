import path from 'path';
import fs from 'fs';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileExt = path.extname(filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  return { fileExt, fileContent };
};

export default readFile;
