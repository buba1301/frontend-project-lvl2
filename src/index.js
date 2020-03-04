
import _ from 'lodash';
import parser from './parsers';


export default (filePath1, filePath2) => {
  const file1 = parser(filePath1);
  const file2 = parser(filePath2);

  const afterNewFileKeys = Object.keys(file2).filter((elem) => !beforeFileKeys.includes(elem));
  const addedItems = afterNewFileKeys.map((elem) => `+ ${elem}: ${file2[elem]}`);

  const beforeFileKeys = Object.keys(file1);
  const difference = beforeFileKeys.reduce((acc, key) => {
    if (_.has(file2, key) && file1[key] === file2[key]) {
      return [`${key}: ${file1[key]}`, ...acc];
    }
    if (_.has(file2, key) && file1[key] !== file2[key]) {
      return [...acc, `- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
    }
    return [...acc, `- ${key}: ${file1[key]}`];
  }, addedItems);

  const differenceToString = `{\n ${difference.join('\n ')}\n}`;
  console.log(differenceToString);
  return differenceToString;
};
