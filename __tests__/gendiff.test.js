/* eslint-env jest */

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import fs from 'fs';

import getDiffFiles from '../src/compare.js';
import { getStringify, getValueFormatted } from '../formatters/stylish.js';
import { getPlain, getValueFormattedPlain } from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('compare files', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const filePath3 = getFixturePath('file3.txt');
  const filePath4 = getFixturePath('file4.yml');
  const filePath5 = getFixturePath('file5.yml');
  const expectedCompareFilesPath = getFixturePath('expectedCompareFiles.txt');
  const expectedCompareFilesContent = fs.readFileSync(expectedCompareFilesPath, 'utf-8');

  const fileNSPath1 = getFixturePath('fileNS1.json');
  const fileNSPath2 = getFixturePath('fileNS2.json');
  const fileNSPath3 = getFixturePath('fileNS3.txt');
  const fileNSPath4 = getFixturePath('fileNS4.yml');
  const fileNSPath5 = getFixturePath('fileNS5.yml');

  const expectedCompareFilesNSPath = getFixturePath('expectedCompareNSFile.txt');
  const expectedCompareFilesPlainPath = getFixturePath('expectedComparePlainFile.txt');

  const expectedCompareFilesNSContent = fs.readFileSync(expectedCompareFilesNSPath, 'utf-8');
  const expectedCompareFilesPlainContent = fs.readFileSync(expectedCompareFilesPlainPath, 'utf-8');

  const testErrorObj1 = {
    key: 'tt', value: 22, value1: 33, value2: 44,
  };
  const testErrorObj2 = {
    key: 'tt', value: 22, value1: 33, value2: testErrorObj1,
  };

  expect(getDiffFiles(filePath1, filePath2)).toEqual(expectedCompareFilesContent);

  expect(getDiffFiles(filePath4, filePath5)).toEqual(expectedCompareFilesContent);

  expect(() => getDiffFiles(filePath1, filePath3)).toThrow('Unsupported file format: .txt');

  expect(getDiffFiles(fileNSPath1, fileNSPath2)).toEqual(expectedCompareFilesNSContent);

  expect(getDiffFiles(fileNSPath1, fileNSPath2, 'stylish')).toEqual(expectedCompareFilesNSContent);

  expect(getDiffFiles(fileNSPath1, fileNSPath2, 'test')).toEqual(expectedCompareFilesNSContent);

  expect(getDiffFiles(fileNSPath4, fileNSPath5)).toEqual(expectedCompareFilesNSContent);

  expect(getDiffFiles(fileNSPath1, fileNSPath2, 'plain')).toEqual(expectedCompareFilesPlainContent);

  expect(getDiffFiles(fileNSPath4, fileNSPath5, 'plain')).toEqual(expectedCompareFilesPlainContent);

  expect(() => getDiffFiles(fileNSPath1, fileNSPath3)).toThrow('Unsupported file format: .txt');

  expect(() => getValueFormatted(testErrorObj2, 'test', 1)).toThrow('Error: not found type compare: test');
  expect(() => getValueFormattedPlain(testErrorObj2, '', 'test')).toThrow('Error: not found type compare: test');

  expect(getStringify('')).toEqual('');
  expect(getPlain('')).toEqual('');
});
