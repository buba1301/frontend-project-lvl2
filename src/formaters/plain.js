
const stringify = (data) => (data instanceof Object ? '[complex value]' : `'${data}'`);

const mapped = {
  deleted: (key) => `Property '${key}' was deleted\n`,
  added: (key, value) => `Property '${key}' was added with value: ${stringify(value)}\n`,
  unchanged: (key) => `Property '${key}' was unchanged\n`,
  changed: (key, { added, deleted }) => `Property '${key}' was changed from ${stringify(deleted)} to ${stringify(added)}\n`,
};

const formatToPlain = (data, keys = []) => data.map(({
  name, value, children, state,
}) => {
  if (children.length > 0) {
    return formatToPlain(children, [...keys, name]);
  }

  const key = [...keys, name].join('.');
  return mapped[state](key, value);
}).join('');

export default formatToPlain;
