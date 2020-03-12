
const stringify = (data) => {
  if (data instanceof Object) {
    return '[complex value]';
  }
  return `'${data}'`;
};

const mapped = {
  deleted: (key) => `Property '${key}' was deleted\n`,
  added: (key, value) => `Property '${key}' was added with value: ${stringify(value)}\n`,
  unchanged: (key) => `Property '${key}' was unchanged\n`,
  changed: (key, { added, deleted }) => `Property '${key}' was changed from ${stringify(deleted)} to ${stringify(added)}\n`,
};

const plain = (data, keys = []) => {
  if (data.type === 'keyList') {
    return `${data.children.map((elem) => plain(elem, keys)).join('')}`;
  }
  const { name, value, state } = data;
  if (value.type === 'keyList') {
    return `${value.children.map((elem) => plain(elem, [...keys, name])).join('')}`;
  }
  const key = [...keys, name].join('.');
  return `${mapped[state](key, value)}`;
};

export default plain;
