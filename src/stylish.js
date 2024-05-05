const repeatDiff = 4;

const offsetDiff = 2;
const offsetObj = 0;
const offsetValue = 4;

const count = (depth, repeat, offset = offsetDiff) => depth * repeat - offset;

export const margin = (depth, repeat = repeatDiff, offset = offsetDiff) => `${' '.repeat(count(depth, repeat, offset))}`;

const objFormatted = (obj, depth, prefixKey) => {
  const keys = Object.keys(obj);
  let result = '{';

  keys.forEach((key) => {
    const fullKey = prefixKey ? `${prefixKey}: {${key}` : key;

    const valueOfKey = obj[key];
    if (typeof valueOfKey === 'object' && !Array.isArray(valueOfKey) && valueOfKey !== null) {
      result += `\n${margin(depth + 1, repeatDiff, offsetObj)}${key}: ${objFormatted(valueOfKey, depth + 1, fullKey)}`;
    } else {
      result += `\n${margin(depth + 1, repeatDiff, offsetObj)}${key}: ${valueOfKey}`;
    }
  });

  return `${result}\n${margin(depth, repeatDiff, offsetObj)}}`;
};

export const getValueFormatted = (valueIntr, type, depth) => {
  const key = String(valueIntr.key);
  const value = (typeof valueIntr.value === 'object' && valueIntr.value !== null) ? objFormatted(valueIntr.value, depth, '') : String(valueIntr.value);
  const value1 = (typeof valueIntr.value1 === 'object' && valueIntr.value1 !== null) ? objFormatted(valueIntr.value1, depth, '') : String(valueIntr.value1);
  const value2 = (typeof valueIntr.value2 === 'object' && valueIntr.value2 !== null) ? objFormatted(valueIntr.value2, depth, '') : String(valueIntr.value2);

  switch (type) {
    case 'added':
      return `${margin(depth)}+ ${key}: ${value}`;
    case 'deleted':
      return `${margin(depth)}- ${key}: ${value}`;
    case 'changed':
      return `${margin(depth)}- ${key}: ${value1}\n${margin(depth)}+ ${key}: ${value2}`;
    case 'unchanged':
      return `${margin(depth)}  ${key}: ${value}`;
    default:
      throw new Error(`Error: not found type compare: ${type}`);
  }
};

const stringifyIter = (value, depth, prefixKey) => {
  let result = '';
  value.forEach((obj) => {
    const { key } = obj;
    const fullKey = prefixKey ? `${prefixKey}: {${key}` : key;

    if (obj.type === 'nested') {
      const valueOfKey = obj.children;
      result += `\n${margin(depth, repeatDiff, offsetObj)}${key}: {${stringifyIter(valueOfKey, depth + 1, fullKey)}\n${margin(depth + 1, repeatDiff, offsetValue)}}`;
    } else {
      const valueOfKey = getValueFormatted(obj, obj.type, depth);
      result += `\n${valueOfKey}`;
    }
  });

  return result;
};

export const getStringify = (value) => {
  if (!Array.isArray(value) || (Array.isArray(value) && value.length === 0)) {
    return value;
  }
  const depth = 1;
  return `{${stringifyIter(value, depth, '')}\n}`;
};
