import { getStringify } from './formatters/stylish.js';
import { getPlain } from './formatters/plain.js';
import getJson from './formatters/json.js';

const selectFormatter = (diffLines, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return getStringify(diffLines);
    case 'plain':
      return getPlain(diffLines);
    case 'json':
      return getJson(diffLines);
    default:
      throw new Error('Unknown format or format specified incorrectly');
  }
};

export default selectFormatter;
