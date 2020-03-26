
const outputValueType = {
  // eslint-disable-next-line no-restricted-globals
  string: (value) => `'${value}'`,
  boolean: (value) => value,
  object: () => '[complex value]',
  number: (value) => value,
};

const stringify = (data) => (outputValueType[(typeof data)](data));

const key = (name, keys) => [...keys, name].join('.');

const mapped = {
  deleted: ({ name }, keys) => `Property '${key(name, keys)}' was deleted`,
  added: ({ name, value }, keys) => `Property '${key(name, keys)}' was added with value: ${stringify(value)}`,
  unchanged: ({ name }, keys) => `Property '${key(name, keys)}' was unchanged`,
  changed: ({ name, beforeValue, afterValue }, keys) => `Property '${key(name, keys)}' was changed from ${stringify(beforeValue)} to ${stringify(afterValue)}`,
  nested: ({ name, children }, keys, fn) => fn(children, [...keys, name]),
};

const buildPlainFormat = (data, keys = []) => data.map((node) => {
  const { state } = node;
  return mapped[state](node, keys, buildPlainFormat);
}).join('\n');

export default buildPlainFormat;
