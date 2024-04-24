/* eslint-env jest */

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import fs from 'fs';

import getDiffFiles from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('compare files', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const filePath3 = getFixturePath('file3.txt');
  const expectedCompareFilesPath = getFixturePath('expectedCompareFiles.txt');
  const expectedCompareFilesContent = fs.readFileSync(expectedCompareFilesPath, 'utf-8');

  expect(getDiffFiles(filePath1, filePath2)).toEqual(expectedCompareFilesContent);
  expect(() => getDiffFiles(filePath1, filePath3)).toThrow('Unsupported file format: .txt');
});
