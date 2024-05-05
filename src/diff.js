import _ from 'lodash';

const getKeysUniqueSort = (file1, file2) => {
  const keysAllUnique = _.union(Object.keys(file1), Object.keys(file2));
  const keysSort = _.sortBy(keysAllUnique);
  return keysSort;
};

const getDiffLine = (key, parseFile1, parseFile2) => {
  if (!_.has(parseFile2, key)) {
    const diffLine = { key, value: parseFile1[key], type: 'deleted' };
    return diffLine;
  }
  if (!_.has(parseFile1, key)) {
    const diffLine = { key, value: parseFile2[key], type: 'added' };
    return diffLine;
  }
  if (parseFile1[key] === parseFile2[key]) {
    const diffLine = { key, value: parseFile1[key], type: 'unchanged' };
    return diffLine;
  }

  const diffLine = {
    key, value1: parseFile1[key], value2: parseFile2[key], type: 'changed',
  };
  return diffLine;
};

const getDiffArray = (parseFile1, parseFile2) => {
  const keysUniqueSort = getKeysUniqueSort(parseFile1, parseFile2);

  const diffLinesArray = [];

  keysUniqueSort.map((key) => {
    if (typeof parseFile1[key] === 'object' && !Array.isArray(parseFile1[key]) && parseFile1[key] !== null && typeof parseFile2[key] === 'object' && !Array.isArray(parseFile2[key]) && parseFile2[key] !== null) {
      const newLine = { key, children: getDiffArray(parseFile1[key], parseFile2[key]), type: 'nested' };
      diffLinesArray.push(newLine);
      return newLine;
    }
    const newLine = getDiffLine(key, parseFile1, parseFile2);
    diffLinesArray.push(newLine);
    return newLine;
  });

  return diffLinesArray;
};

export default getDiffArray;
