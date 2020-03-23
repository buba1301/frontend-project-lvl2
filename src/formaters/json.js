
const strInNum = (value) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value) || typeof value === 'boolean') {
    return value;
  }
  return Number(value);
};

const stringify = (data) => (data instanceof Object ? '[complex value]' : strInNum(data));

const mapped = {
  deleted: ({ value }) => stringify(value),
  added: ({ value }) => stringify(value),
  unchanged: ({ value }) => stringify(value),
  changed: ({ value }) => `from ${stringify(value.deleted)} to ${stringify(value.added)}`,
  children: ({ children }, fn) => fn(children),
};

const buildJsonFormat = (data) => data.reduce((acc, node) => {
  const { name, state } = node;
  return { ...acc, [name]: { [state]: mapped[state](node, buildJsonFormat) } };
}, {});

export default (data) => JSON.stringify(buildJsonFormat(data));
