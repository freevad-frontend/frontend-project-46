import readFile from './reader.js';
import parseFile from './parser.js';

import getDiffArray from './diff.js';
import selectFormatter from './selectformatters.js';

const getDiffFiles = (filepath1, filepath2, formatter = 'stylish') => {
  const fileRead1 = readFile(filepath1);
  const fileRead2 = readFile(filepath2);
  const parseFile1 = parseFile(fileRead1);
  const parseFile2 = parseFile(fileRead2);

  const diffLines = getDiffArray(parseFile1, parseFile2);

  return selectFormatter(diffLines, formatter);
};

export default getDiffFiles;
