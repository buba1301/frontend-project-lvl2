
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
  deleted: ({ name, value }, count) => `\n${spaces(count - 2)}- ${name}: ${stringify(value, count)}`,
  added: ({ name, value }, count) => `\n${spaces(count - 2)}+ ${name}: ${stringify(value, count)}`,
  unchanged: ({ name, value }, count) => `\n${spaces(count)}${name}: ${stringify(value, count)}`,
  changed: ({ name, value }, count) => `\n${spaces(count - 2)}+ ${name}: ${stringify(value.added, count)}\n${spaces(count - 2)}- ${name}: ${stringify(value.deleted, count)}`,
  children: ({ name, children }, count, fn, newCount) => `\n${spaces(count)}${name}: {${fn(children, newCount)}\n${spaces(count)}}`,
};

const buildDetailedFormat = (data, count = 4) => data.map((node) => {
  const { state } = node;
  const newCount = count + 4;
  return mapped[state](node, count, buildDetailedFormat, newCount);
}).join('');

export default (data) => `{${buildDetailedFormat(data)}\n}`;
