import _ from 'lodash';
import { margin, getStringify } from './stylish.js';

const depthFirst = 1;

const getKeysUniqueSort = (file1, file2) => {
  const keysAllUnique = _.union(Object.keys(file1), Object.keys(file2));
  const keysSort = _.sortBy(keysAllUnique);
  return keysSort;
};

const iterDiff = (key, parseFile1, parseFile2, depth) => {
  const value1 = getStringify(parseFile1[key], depth);
  const value2 = getStringify(parseFile2[key], depth);

  if (!_.has(parseFile2, key)) {
    // const value1 = getStringify(parseFile1[key], depth);
    return `${margin(depth)}- ${key}: ${value1}`;
  }
  if (!_.has(parseFile1, key)) {
    // const value2 = getStringify(parseFile2[key], depth);
    return `${margin(depth)}+ ${key}: ${value2}`;
  }
  if (parseFile1[key] === parseFile2[key]) {
    // const value1 = getStringify(parseFile1[key], depth);
    return `${margin(depth)}  ${key}: ${value1}`;
  }

  return `${margin(depth)}- ${key}: ${value1}\n${margin(depth)}+ ${key}: ${value2}`;
};

const getPrefix = (prefixKey, key) => (prefixKey ? `${prefixKey}: {${key}` : key);

const iterDiffLines = (parseFile1, parseFile2, prefixKey, depth) => {
  const keysUniqueSort = getKeysUniqueSort(parseFile1, parseFile2);

  const diffLines = keysUniqueSort.map((key) => {
    const fullKey = getPrefix(prefixKey, key);

    if (typeof parseFile1[key] === 'object' && !Array.isArray(parseFile1[key]) && typeof parseFile2[key] === 'object' && !Array.isArray(parseFile2[key])) {
      const depthNew = depth + 1;
      return `\n  ${margin(depth)}${key}: {${iterDiffLines(parseFile1[key], parseFile2[key], fullKey, depthNew)}\n${margin(depth)}  }`;
    }
    return `\n${iterDiff(key, parseFile1, parseFile2, depth)}`;
  });

  return diffLines.join('');
};

const getDiffLines = (parseFile11, parseFile22) => iterDiffLines(parseFile11, parseFile22, '', depthFirst);

export default getDiffLines;
