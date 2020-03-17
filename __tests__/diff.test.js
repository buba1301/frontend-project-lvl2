import path from 'path';
import fs from 'fs';
import getDiff from '../src';

const testArgs = [
  ['json', 'toString'],
  ['yml', 'toString'],
  ['ini', 'toString'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['ini', 'json'],
  ['yml', 'json'],
];

test.each(testArgs)('%s type files difference with %s output', (filetype, format) => {
  console.log(format);
  const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);
  const filePath = (file) => getFixturePath(file);
  const expected = (result) => fs.readFileSync(getFixturePath(result), 'utf-8');
  expect(getDiff(filePath(`before.${filetype}`), filePath(`after.${filetype}`), format)).toBe(expected(`${format}.txt`));
});
