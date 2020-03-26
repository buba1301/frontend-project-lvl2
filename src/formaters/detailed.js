const indent = 2;
const spaces = (depth) => ' '.repeat(depth * indent);

const stringify = (data, depth) => {
  if (!(data instanceof Object)) {
    return `${data}`;
  }
  const newDepth = depth + 3;
  const mapped = Object.keys(data).map((key) => `${key}: ${data[key]}`);
  return `{\n${spaces(newDepth)}${mapped.join('\n')}\n${spaces(depth + 1)}}`;
};

const mapped = {
  deleted: ({ name, value }, depth) => `\n${spaces(depth)}- ${name}: ${stringify(value, depth)}`,
  added: ({ name, value }, depth) => `\n${spaces(depth)}+ ${name}: ${stringify(value, depth)}`,
  unchanged: ({ name, value }, depth) => `\n${spaces(depth)}  ${name}: ${stringify(value, depth)}`,
  changed: ({ name, beforeValue, afterValue }, depth) => `\n${spaces(depth)}+ ${name}: ${stringify(afterValue, depth)}\n${spaces(depth)}- ${name}: ${stringify(beforeValue, depth)}`,
  nested: ({ name, children }, depth, fn, newDepth) => `\n${spaces(depth)}  ${name}: {${fn(children, newDepth)}\n${spaces(depth + 1)}}`,
};

const buildDetailedFormat = (data, depth = 1) => data.map((node) => {
  const { state } = node;
  const newDepth = depth + 2;
  return mapped[state](node, depth, buildDetailedFormat, newDepth);
}).join('');

export default (data) => `{${buildDetailedFormat(data)}\n}`;
