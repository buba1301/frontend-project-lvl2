import _ from 'lodash';

const iter = (data) => {
  const [first] = data;
  if (first instanceof Array) {
    return { type: 'propertyList', children: data.map(iter) };
  }
  const [name, body, state] = data;
  const processBody = body instanceof Array ? iter(body) : body;
  return {
    type: 'property',
    name,
    value: processBody,
    state,
  };
};


const difference = (file1, file2) => {
  const beforeFileKeys = Object.keys(file1);
  const afterFileKeys = Object.keys(file2);
  const allKeys = _.union(beforeFileKeys, afterFileKeys);

  const diff = allKeys.reduce((acc, key) => {
    const beforeValue = file1[key];
    const afterValue = file2[key];
    if (beforeValue instanceof Object && afterValue instanceof Object) {
      return [...acc, [key, difference(beforeValue, afterValue), 'unchanged']];
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return [...acc, [key, beforeValue, 'deleted']];
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return [...acc, [key, afterValue, 'added']];
    }
    if (_.has(file1, key) && _.has(file2, key) && beforeValue === afterValue) {
      return [...acc, [key, afterValue, 'unchanged']];
    }
    return [...acc, [key, { added: afterValue, deleted: beforeValue }, 'changed']];
  }, []);

  return iter(diff);
};

export default difference;
