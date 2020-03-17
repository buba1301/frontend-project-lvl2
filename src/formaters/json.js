
const strInNum = (value) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value) || typeof value === 'boolean') {
    return value;
  }
  return Number(value);
};

const stringify = (data) => (data instanceof Object ? '[complex value]' : strInNum(data));

const mapped = {
  deleted: (value) => stringify(value),
  added: (value) => stringify(value),
  unchanged: (value) => stringify(value),
  changed: ({ added, deleted }) => `from ${stringify(deleted)} to ${stringify(added)}`,
};

const formatToJson = (data) => data.reduce((acc, {
  name, value, children, state,
}) => {
  if (children.length > 0) {
    return { ...acc, [name]: formatToJson(children) };
  }
  return { ...acc, [name]: { [state]: mapped[state](value) } };
}, {});

export default (data) => JSON.stringify(formatToJson(data));
