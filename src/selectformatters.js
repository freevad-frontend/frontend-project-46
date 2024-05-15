import { getStringify } from './formatters/stylish.js';
import { getPlain } from './formatters/plain.js';
import getJson from './formatters/json.js';

const selectFormatter = (diffLines, formatter) => {
  switch (formatter) {
    case 'stylish':
      return getStringify(diffLines);
    case 'plain':
      return getPlain(diffLines);
    case 'json':
      return getJson(diffLines);
    default:
      return getStringify(diffLines);
  }
};

export default selectFormatter;
