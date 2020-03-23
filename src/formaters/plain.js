
const stringify = (data) => (data instanceof Object ? '[complex value]' : `'${data}'`);

const key = (name, keys) => [...keys, name].join('.');

const mapped = {
  deleted: ({ name }, keys) => `Property '${key(name, keys)}' was deleted\n`,
  added: ({ name, value }, keys) => `Property '${key(name, keys)}' was added with value: ${stringify(value)}\n`,
  unchanged: ({ name }, keys) => `Property '${key(name, keys)}' was unchanged\n`,
  changed: ({ name, value }, keys) => `Property '${key(name, keys)}' was changed from ${stringify(value.deleted)} to ${stringify(value.added)}\n`,
  children: ({ name, children }, keys, fn) => fn(children, [...keys, name]),
};

const buildPlainFormat = (data, keys = []) => data.map((node) => {
  const { state } = node;
  return mapped[state](node, keys, buildPlainFormat);
}).join('');

export default buildPlainFormat;
