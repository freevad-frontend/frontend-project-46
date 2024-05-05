import _ from 'lodash';

const getKeysUniqueSort = (file1, file2) => {
  const keysAllUnique = _.union(Object.keys(file1), Object.keys(file2));
  const keysSort = _.sortBy(keysAllUnique);
  return keysSort;
};

const isHas = (obj, key) => (!!_.has(obj, key));

const getDiffLine = (key, parseFile1, parseFile2) => {
  if (!isHas(parseFile2, key)) {
    const diffLine = { key, value: parseFile1[key], type: 'deleted' };
    return diffLine;
  }
  if (!isHas(parseFile1, key)) {
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

const isObject = (value) => (!!((typeof value === 'object' && !Array.isArray(value) && value !== null)));

const getDiffArray = (parseFile1, parseFile2) => {
  const keysUniqueSort = getKeysUniqueSort(parseFile1, parseFile2);

  const diffLinesArray = [];

  keysUniqueSort.map((key) => {
    if (isObject(parseFile1[key]) && isObject(parseFile2[key])) {
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
