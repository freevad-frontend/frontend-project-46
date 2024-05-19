const repeatDiff = 4;

const offsetDiff = 2;
const offsetObj = 0;
const offsetEndObj = 4;

const count = (depth, repeat, offset = offsetDiff) => depth * repeat - offset;

const getMargin = (depth, repeat = repeatDiff, offset = offsetDiff) => `${' '.repeat(count(depth, repeat, offset))}`;

const objFormatted = (obj, depth, prefixKey) => {
  const keys = Object.keys(obj);

  const result = keys.reduce((acc, key) => {
    const fullKey = prefixKey ? `${prefixKey}: {${key}` : key;
    const valueOfKey = obj[key];
    const margin = getMargin(depth + 1, repeatDiff, offsetObj);

    if (typeof valueOfKey === 'object' && !Array.isArray(valueOfKey) && valueOfKey !== null) {
      return `${acc}\n${margin}${key}: ${objFormatted(valueOfKey, depth + 1, fullKey)}`;
    }
    return `${acc}\n${margin}${key}: ${valueOfKey}`;
  }, '{');

  return `${result}\n${getMargin(depth, repeatDiff, offsetObj)}}`;
};

const getValueFormattedToString = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    return objFormatted(value, depth, '');
  }

  return String(value);
};

export const getValueFormatted = (valueIntr, type, depth) => {
  const { key } = valueIntr;
  const value = getValueFormattedToString(valueIntr.value, depth);
  const oldValue = getValueFormattedToString(valueIntr.oldValue, depth);
  const newValue = getValueFormattedToString(valueIntr.newValue, depth);

  switch (type) {
    case 'added':
      return `${getMargin(depth)}+ ${key}: ${value}`;
    case 'deleted':
      return `${getMargin(depth)}- ${key}: ${value}`;
    case 'changed':
      return `${getMargin(depth)}- ${key}: ${oldValue}\n${getMargin(depth)}+ ${key}: ${newValue}`;
    case 'unchanged':
      return `${getMargin(depth)}  ${key}: ${value}`;
    default:
      throw new Error(`Error: not found type compare: ${type}`);
  }
};

const stringifyIter = (value, depth, prefixKey) => value.reduce((result, obj) => {
  const { key } = obj;
  const fullKey = prefixKey ? `${prefixKey}: {${key}` : key;

  if (obj.type === 'nested') {
    const valueOfKey = obj.children;
    return `${result}\n${getMargin(depth, repeatDiff, offsetObj)}${key}: {${stringifyIter(valueOfKey, depth + 1, fullKey)}\n${getMargin(depth + 1, repeatDiff, offsetEndObj)}}`;
  }
  const valueOfKey = getValueFormatted(obj, obj.type, depth);
  return `${result}\n${valueOfKey}`;
}, '');

export const getStringify = (value) => {
  if (!Array.isArray(value) || (Array.isArray(value) && value.length === 0)) {
    return value;
  }
  const depth = 1;
  return `{${stringifyIter(value, depth, '')}\n}`;
};
