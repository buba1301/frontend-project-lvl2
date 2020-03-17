import _ from 'lodash';

const mapped = [
  {
    // eslint-disable-next-line max-len
    check: (key, beforeFile, afterFile) => _.isObject(beforeFile[key]) && _.isObject(afterFile[key]),
    process: (key, beforeValue, afterValue, fn) => ({
      name: key, value: null, children: fn(beforeValue, afterValue), state: 'children',
    }),
  },
  {
    check: (key, beforeFile) => !_.has(beforeFile, key),
    process: (key, beforeValue, afterValue) => ({
      name: key, value: afterValue, children: [], state: 'added',
    }),
  },
  {
    check: (key, beforeFile, afterFile) => !_.has(afterFile, key),
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, children: [], state: 'deleted',
    }),
  },
  {
    check: (key, beforeFile, afterFile) => beforeFile[key] === afterFile[key],
    process: (key, beforeValue) => ({
      name: key, value: beforeValue, children: [], state: 'unchanged',
    }),
  },
  {
    check: (key, beforeFile, afterFile) => beforeFile[key] !== afterFile[key],
    process: (key, beforeValue, afterValue) => ({
      name: key, value: { added: afterValue, deleted: beforeValue }, children: [], state: 'changed',
    }),
  },
];

const getElem = (key, data1, data2) => mapped.find(({ check }) => check(key, data1, data2));

const difference = (file1, file2) => {
  const beforeFileKeys = Object.keys(file1);
  const afterFileKeys = Object.keys(file2);
  const allKeys = _.union(beforeFileKeys, afterFileKeys);

  return allKeys.map((key) => {
    const beforeValue = file1[key];
    const afterValue = file2[key];
    const { process } = getElem(key, file1, file2);
    return process(key, beforeValue, afterValue, difference);
  });
};
export default difference;
