import readFile from './reader.js';
import parseFile from './parser.js';

import getDiffLines from './diff.js';

const getDiffFiles = (filepath1, filepath2) => {
  const fileRead1 = readFile(filepath1);
  const fileRead2 = readFile(filepath2);
  const parseFile1 = parseFile(fileRead1);
  const parseFile2 = parseFile(fileRead2);

  const diffLines = getDiffLines(parseFile1, parseFile2);

  return `{${diffLines}\n}`;
};

export default getDiffFiles;
