
const stringify = (data) => (data instanceof Object ? '[complex value]' : `'${data}'`);

const mapped = {
  deleted: () => 'Property was deleted',
  added: (value) => `Property was added with value: ${stringify(value)}`,
  unchanged: (value) => (value instanceof Array ? value : 'Property was unchanged'),
  changed: ({ added, deleted }) => `Property was changed from ${stringify(deleted)} to ${stringify(added)}`,
};

const iter = (data) => {
  if (data.type === 'propertyList') {
    return data.children.map((elem) => iter(elem));
  }
  const { name, value, state } = data;

  const processValue = value.type === 'propertyList' ? iter(value) : value;
  return [name, mapped[state](processValue, state)];
};

const render = (data) => {
  return data.reduce((acc, [key, value]) => {
    return value instanceof Array ? { ...acc, [key]: render(value) } : { ...acc, [key]: value };
  }, {});
};

export default (data) => JSON.stringify(render(iter(data)), '', '  ');
