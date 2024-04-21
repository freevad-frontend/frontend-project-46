// import readFile from "./read";

const parseFile = ({ fileExt, fileContent }) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileExt}`);
  }
};

export default parseFile;
