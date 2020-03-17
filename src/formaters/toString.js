
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
  deleted: (count, name, value) => `\n${spaces(count - 2)}- ${name}: ${stringify(value, count)}`,
  added: (count, name, value) => `\n${spaces(count - 2)}+ ${name}: ${stringify(value, count)}`,
  unchanged: (count, name, value) => `\n${spaces(count)}${name}: ${stringify(value, count)}`,
  changed: (count, name, { added, deleted }) => `\n${spaces(count - 2)}+ ${name}: ${stringify(added, count)}\n${spaces(count - 2)}- ${name}: ${stringify(deleted, count)}`,
  children: (count, name, children, fn, newCount) => `\n${spaces(count)}${name}: {${fn(children, newCount)}\n${spaces(count)}}`,
};

const renderToString = (data, count = 4) => data.map(({
  name, value, children, state,
}) => {
  if (children.length > 0) {
    const newCount = count + 4;
    return mapped[state](count, name, children, renderToString, newCount);
  }
  return mapped[state](count, name, value);
}).join('');

export default (data) => `{${renderToString(data)}\n}`;
