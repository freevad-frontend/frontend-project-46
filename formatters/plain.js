const valueIsObject = (value) => !!(typeof value === 'object' && value !== null);

const valueToString = (value) => {
  if (typeof value === 'string') {
    return `'${String(value)}'`;
  }
  return `${String(value)}`;
};

const selectValueView = (value) => (valueIsObject(value) ? '[complex value]' : valueToString(value));

export const getValueFormattedPlain = (valueIntr, prefixKey, type) => {
  const key = String(valueIntr.key);
  const value = selectValueView(valueIntr.value);
  const value1 = selectValueView(valueIntr.value1);
  const value2 = selectValueView(valueIntr.value2);

  switch (type) {
    case 'added':
      return `Property '${prefixKey}${key}' was added with value: ${value}`;
    case 'deleted':
      return `Property '${prefixKey}${key}' was removed`;
    case 'changed':
      return `Property '${prefixKey}${key}' was updated. From ${value1} to ${value2}`;
    case 'unchanged':
      return '';
    default:
      throw new Error(`Error: not found type compare: ${type}`);
  }
};

const plainIter = (value, prefixKey) => {
  let result = '';
  value.forEach((obj) => {
    const { key } = obj;
    const fullKey = prefixKey ? `${prefixKey}${key}.` : `${key}.`;

    if (obj.type === 'nested') {
      const valueOfKey = obj.children;
      result = `${result}${plainIter(valueOfKey, fullKey)}`;
    } else {
      const valueOfKey = getValueFormattedPlain(obj, prefixKey, obj.type);
      if (valueOfKey === '') {
        result = `${result}`;
      } else {
        result = `${result}${valueOfKey}\n`;
      }
    }
  });

  return result;
};

export const getPlain = (value) => {
  if (!Array.isArray(value) || (Array.isArray(value) && value.length === 0)) {
    return value;
  }

  return `${plainIter(value, '').trimEnd()}`;
};
