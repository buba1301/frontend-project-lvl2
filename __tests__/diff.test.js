import path from 'path';
import fs from 'fs';
import getDiff from '../src';

const testArgs = [
  ['json', 'detailed'],
  ['yml', 'detailed'],
  ['ini', 'detailed'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['ini', 'json'],
  ['yml', 'json'],
];

const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);

test.each(testArgs)('%s type files difference with %s output', (filetype, format) => {
  const filePath = (file) => getFixturePath(file);

  const beforeFilePath = filePath(`before.${filetype}`);
  const afterFilePath = filePath(`after.${filetype}`);

  const actualValue = getDiff(beforeFilePath, afterFilePath, format);
  const expectedValue = fs.readFileSync(getFixturePath(`${format}.txt`), 'utf-8');

  expect(actualValue).toBe(expectedValue);
});
