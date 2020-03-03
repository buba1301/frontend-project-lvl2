import path from 'path';
import fs from 'fs';
import process from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';

const mapping = {
  yaml: (data) => yaml.safeLoad(data),
  yml: (data) => yaml.safeLoad(data),
  json: (data) => JSON.parse(data),
};

const parser = (filePath) => {
  const pathToFile = path.resolve(process.cwd(), filePath);
  const type = path.extname(filePath).slice(1);
  const data = fs.readFileSync(pathToFile);
  return mapping[type](data);
};

export default (filePath1, filePath2) => {
  const file1 = parser(filePath1);
  const file2 = parser(filePath2);
  const beforeFileKeys = Object.keys(file1);
  const afterFileKeys = Object.keys(file2).filter((elem) => !beforeFileKeys.includes(elem));
  const addedItems = afterFileKeys.map((elem) => `+ ${elem}: ${file2[elem]}`);
  const difference = beforeFileKeys.reduce((acc, elem) => {
    if (_.has(file2, elem) && file1[elem] === file2[elem]) {
      return [`${elem}: ${file1[elem]}`, ...acc];
    }
    if (_.has(file2, elem) && file1[elem] !== file2[elem]) {
      return [...acc, `- ${elem}: ${file1[elem]}`, `+ ${elem}: ${file2[elem]}`];
    }
    if (!_.has(file2, elem)) {
      return [...acc, `- ${elem}: ${file1[elem]}`];
    }
  }, addedItems);
  const differenceToString = `{\n${difference.join('\n')}\n}`;
  return differenceToString;
};
