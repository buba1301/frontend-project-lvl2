
const outputValueType = {
  // eslint-disable-next-line no-restricted-globals
  string: (value) => (isNaN(value) ? value : Number(value)),
  boolean: (value) => value,
  object: () => '[complex value]',
  number: (value) => value,
};

const stringify = (data) => outputValueType[(typeof data)](data);

const mapped = {
  deleted: ({ value }) => stringify(value),
  added: ({ value }) => stringify(value),
  unchanged: ({ value }) => stringify(value),
  changed: ({ beforeValue, afterValue }) => `from ${stringify(beforeValue)} to ${stringify(afterValue)}`,
  nested: ({ children }, fn) => fn(children),
};

const buildJsonFormat = (data) => data.reduce((acc, node) => {
  const { name, state } = node;
  return { ...acc, [name]: { [state]: mapped[state](node, buildJsonFormat) } };
}, {});

export default (data) => JSON.stringify(buildJsonFormat(data));
