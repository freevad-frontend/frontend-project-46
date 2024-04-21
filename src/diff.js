import readFile from './reader.js';
import parseFile from './parser.js';

const getDiffFiles = (filepath1, filepath2) => {
  const fileRead1 = readFile(filepath1);
  const fileRead2 = readFile(filepath2);
  const parseFile1 = parseFile(fileRead1);
  const parseFile2 = parseFile(fileRead2);

  console.log(parseFile1);
  console.log(parseFile2);
};

export default getDiffFiles;
