/* eslint-disable max-len */
import _ from 'lodash';

const mapped = [
  {
    check: (key, beforeData, afterData) => _.isObject(beforeData[key]) && _.isObject(afterData[key]),
    process: (key, beforeValue, afterValue, fn) => ({
      name: key, state: 'nested', children: fn(beforeValue, afterValue),
    }),
  },
  {
    check: (key, beforeData) => !_.has(beforeData, key),
    process: (key, _beforeValue, afterValue) => ({
      name: key, value: afterValue, state: 'added',
    }),
  },
  {
    check: (key, _beforeData, afterData) => !_.has(afterData, key),
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, state: 'deleted',
    }),
  },
  {
    check: (key, beforeFile, afterData) => beforeFile[key] === afterData[key],
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, state: 'unchanged',
    }),
  },
  {
    check: (key, beforeData, afterData) => beforeData[key] !== afterData[key],
    process: (key, beforeValue, afterValue) => ({
      name: key, beforeValue, afterValue, state: 'changed',
    }),
  },
];

const getElem = (key, beforeData, afterData) => mapped.find(({ check }) => check(key, beforeData, afterData));

const buildDifference = (beforeData, afterData) => {
  const beforeFileKeys = Object.keys(beforeData);
  const afterFileKeys = Object.keys(afterData);
  const allKeys = _.union(beforeFileKeys, afterFileKeys);

  return allKeys.map((key) => {
    const beforeValue = beforeData[key];
    const afterValue = afterData[key];
    const { process } = getElem(key, beforeData, afterData);
    return process(key, beforeValue, afterValue, buildDifference);
  });
};
export default buildDifference;
