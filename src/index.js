
import _ from 'lodash';
import parser from './parsers';


const keys = (file) => Object.keys(file);

const spaces = (countSpace) => ' '.repeat(countSpace);

const stringify = (data, count) => {
  const newCount = count + 4;
  if (data instanceof Object) {
    const mapped = Object.keys(data).map((key) => `${key}: ${data[key]}`);
    return `{\n${spaces(newCount)}${mapped.join('\n')}\n${spaces(count)}}`;
  }
  return data;
};

const render = (key, count, before = 'add', after = 'delete') => {
  const newCountforDiff = count - 2;

  if (before instanceof Object && after instanceof Object) {
    const newCount = count + 4;
    return `\n${spaces(count)}${key}: ${parse(before, after, newCount)}`;
  }
  if (before === after) {
    return `\n${spaces(count)}${key}: ${stringify(before, count)}`;
  }
  if (before === 'add') {
    return `\n${spaces(newCountforDiff)}+ ${key}: ${stringify(after, count)}`;
  }
  if (after === 'delete') {
    return `\n${spaces(newCountforDiff)}- ${key}: ${stringify(before, count)}`;
  }
  // if (before !== after) {
  return [`\n${spaces(newCountforDiff)}- ${key}: ${stringify(before, count)}`, `\n${spaces(newCountforDiff)}+ ${key}: ${stringify(after, count)}`].join('');
};


const parse = (file1, file2, count) => {
  const beforeFileKeys = keys(file1);
  const afterFileKeys = keys(file2);
  const allKeys = _.union(beforeFileKeys, afterFileKeys);

  const difference = allKeys.reduce((acc, key) => {
    const before = file1[key];
    const after = file2[key];
    return [...acc, render(key, count, before, after)];
  }, []);

  const newCount = count - 4;
  return `{${difference.join('')}\n${spaces(newCount)}}`;
};

const getDiff = (filePath1, filePath2) => {
  const file1 = parser(filePath1);
  const file2 = parser(filePath2);
  return parse(file1, file2, 4);
};

export default getDiff;
