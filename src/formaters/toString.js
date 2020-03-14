
const spaces = (c) => ' '.repeat(c);

const stringify = (data, count) => {
  const newCount = count + 4;
  if (data instanceof Object) {
    const mapped = Object.keys(data).map((key) => `${key}: ${data[key]}`);
    return `{\n${spaces(newCount)}${mapped.join('\n')}\n${spaces(count)}}`;
  }
  return `${data}`;
};

const mapped = {
  deleted: (count, name, value) => `${spaces(count - 2)}- ${name}: ${stringify(value, count)}`,
  added: (count, name, value) => `${spaces(count - 2)}+ ${name}: ${stringify(value, count)}`,
  unchanged: (count, name, value) => `${spaces(count)}${name}: ${stringify(value, count)}`,
  changed: (count, name, { added, deleted }) => `${spaces(count - 2)}+ ${name}: ${stringify(added, count)}\n${spaces(count - 2)}- ${name}: ${stringify(deleted, count)}`,
};

const formatToString = (data, count = 0) => {
  if (data.type === 'propertyList') {
    const newCount = count + 4;
    return `{${data.children.map((elem) => formatToString(elem, newCount)).join('')}\n${spaces(count)}}`;
  }
  const { name, value, state } = data;
  const processValue = value.type === 'propertyList' ? formatToString(value, count) : value;
  return `\n${mapped[state](count, name, processValue)}`;
};

export default formatToString;
