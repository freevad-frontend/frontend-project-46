const repeatDiff = 4;

const offsetDiff = 2;
const offsetObj = 0;

const count = (depth, repeat, offset = offsetDiff) => depth * repeat - offset;

export const margin = (depth, repeat = repeatDiff, offset = offsetDiff) => `${' '.repeat(count(depth, repeat, offset))}`;

const stringifyIter = (value, depth, prefixKey) => {
  const keys = Object.keys(value);
  let result = '';

  keys.forEach((key) => {
    const fullKey = prefixKey ? `${prefixKey}: {${key}` : key;

    const valueOfKey = value[key];
    if (typeof valueOfKey === 'object' && !Array.isArray(valueOfKey) && valueOfKey !== null) {
      result += `\n${margin(depth + 1, repeatDiff, offsetObj)}${key}: {${stringifyIter(valueOfKey, depth + 1, fullKey)}\n${margin(depth + 1, repeatDiff, offsetObj)}}`;
    } else {
      result += `\n${margin(depth + 1, repeatDiff, offsetObj)}${key}: ${valueOfKey}`;
    }
  });
  return result;
};

export const getStringify = (value, depth) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return `{${stringifyIter(value, depth, '')}\n${margin(depth, repeatDiff, offsetObj)}}`;
  }

  return value;
};
