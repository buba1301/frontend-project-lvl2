
const stringify = (data) => (data instanceof Object ? '[complex value]' : `'${data}'`);

const mapped = {
  deleted: (key) => `Property '${key}' was deleted\n`,
  added: (key, value) => `Property '${key}' was added with value: ${stringify(value)}\n`,
  unchanged: (key) => `Property '${key}' was unchanged\n`,
  changed: (key, { added, deleted }) => `Property '${key}' was changed from ${stringify(deleted)} to ${stringify(added)}\n`,
};

const formatToPlain = (data, keys = []) => {
  if (data.type === 'propertyList') {
    return `${data.children.map((elem) => formatToPlain(elem, keys)).join('')}`;
  }
  const { name, value, state } = data;
  if (value.type === 'propertyList') {
    return `${value.children.map((elem) => formatToPlain(elem, [...keys, name])).join('')}`;
  }
  const key = [...keys, name].join('.');
  return `${mapped[state](key, value)}`;
};

export default formatToPlain;
