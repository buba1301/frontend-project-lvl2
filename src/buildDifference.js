import _ from 'lodash';

const mapped = [
  {
    // eslint-disable-next-line max-len
    check: (key, beforeFile, afterFile) => _.isObject(beforeFile[key]) && _.isObject(afterFile[key]),
    process: (key, beforeValue, afterValue, fn) => ({
      name: key, state: 'nested', children: fn(beforeValue, afterValue),
    }),
  },
  {
    check: (key, beforeFile) => !_.has(beforeFile, key),
    process: (key, beforeValue, afterValue) => ({
      name: key, value: afterValue, state: 'added',
    }),
  },
  {
    check: (key, _beforeFile, afterFile) => !_.has(afterFile, key),
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, state: 'deleted',
    }),
  },
  {
    check: (key, beforeFile, afterFile) => beforeFile[key] === afterFile[key],
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, state: 'unchanged',
    }),
  },
  {
    check: (key, beforeFile, afterFile) => beforeFile[key] !== afterFile[key],
    process: (key, beforeValue, afterValue) => ({
      name: key, beforeValue, afterValue, state: 'changed',
    }),
  },
];

const getElem = (key, data1, data2) => mapped.find(({ check }) => check(key, data1, data2));

const buildDifference = (content1, content2) => {
  const beforeFileKeys = Object.keys(content1);
  const afterFileKeys = Object.keys(content2);
  const allKeys = _.union(beforeFileKeys, afterFileKeys);

  return allKeys.map((key) => {
    const beforeValue = content1[key];
    const afterValue = content2[key];
    const { process } = getElem(key, content1, content2);
    return process(key, beforeValue, afterValue, buildDifference);
  });
};
export default buildDifference;
