import _ from 'lodash';

const getKeysUniqueSort = (file1, file2) => {
  const keysAllUnique = _.union(Object.keys(file1), Object.keys(file2));
  const keysSort = _.sortBy(keysAllUnique);
  return keysSort;
};

const isHas = (obj, key) => (!!_.has(obj, key));

const getDiffLine = (key, parseFile1, parseFile2) => {
  if (!isHas(parseFile2, key)) {
    return { key, value: parseFile1[key], type: 'deleted' };
  }
  if (!isHas(parseFile1, key)) {
    return { key, value: parseFile2[key], type: 'added' };
  }
  if (parseFile1[key] === parseFile2[key]) {
    return { key, value: parseFile1[key], type: 'unchanged' };
  }

  return {
    key, value1: parseFile1[key], value2: parseFile2[key], type: 'changed',
  };
};

const isObject = (value) => (!!(typeof value === 'object' && !Array.isArray(value) && value !== null));

const getDiffArray = (parseFile1, parseFile2) => {
  const keysUniqueSort = getKeysUniqueSort(parseFile1, parseFile2);

  return keysUniqueSort.reduce((acc, key) => {
    if (isObject(parseFile1[key]) && isObject(parseFile2[key])) {
      const newLine = { key, children: getDiffArray(parseFile1[key], parseFile2[key]), type: 'nested' };
      return [...acc, newLine];
    }
    const newLine = getDiffLine(key, parseFile1, parseFile2);
    return [...acc, newLine];
  }, []);
};

export default getDiffArray;
