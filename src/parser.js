import yaml from 'js-yaml';

const parseFile = ({ fileExt, fileContent }) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.load(fileContent, 'utf8');
    default:
      throw new Error(`Unsupported file format: ${fileExt}`);
  }
};

export default parseFile;
