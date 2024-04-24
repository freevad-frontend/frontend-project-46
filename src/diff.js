import _ from 'lodash';

import readFile from './reader.js';
import parseFile from './parser.js';

const getKeysUniqueSort = (file1, file2) => {
  const keysAllUnique = _.union(Object.keys(file1), Object.keys(file2));
  const keysSort = _.sortBy(keysAllUnique);
  return keysSort;
};

const getDiffFiles = (filepath1, filepath2) => {
  const fileRead1 = readFile(filepath1);
  const fileRead2 = readFile(filepath2);
  const parseFile1 = parseFile(fileRead1);
  const parseFile2 = parseFile(fileRead2);

  const keysSort = getKeysUniqueSort(parseFile1, parseFile2);

  const diffLines = keysSort.map((key) => {
    if (!_.has(parseFile2, key)) {
      return `  - ${key}: ${parseFile1[key]}`;
    }
    if (!_.has(parseFile1, key)) {
      return `  + ${key}: ${parseFile2[key]}`;
    }
    if (parseFile1[key] === parseFile2[key]) {
      return `    ${key}: ${parseFile1[key]}`;
    }
    return `  - ${key}: ${parseFile1[key]}\n  + ${key}: ${parseFile2[key]}`;
  });

  return `{\n${diffLines.join('\n')}\n}`;
};

export default getDiffFiles;
