
const getSpaces = (depth, indent) => ' '.repeat(depth + indent);

const stringify = (data, spaces) => {
  if (!(data instanceof Object)) {
    return `${data}`;
  }

  const newIndent = 6;
  const newSpaces = getSpaces(spaces.length, newIndent);

  const mapped = Object.keys(data).map((key) => `${newSpaces}${key}: ${data[key]}`).join('\n');
  return ['{', mapped, `${spaces}  }`].join('\n');
};

const mapped = {
  deleted: ({ name, value }, spaces) => [spaces, `- ${name}: `, stringify(value, spaces)].join(''),

  added: ({ name, value }, spaces) => [spaces, `+ ${name}: `, stringify(value, spaces)].join(''),

  unchanged: ({ name, value }, spaces) => [spaces, `  ${name}: `, stringify(value, spaces)].join(''),

  changed: ({ name, beforeValue, afterValue }, spaces) => {
    const addedValue = stringify(afterValue, spaces);
    const deletedValue = stringify(beforeValue, spaces);
    return [`${spaces}+ ${name}: ${addedValue}`, `${spaces}- ${name}: ${deletedValue}`].join('\n');
  },

  nested: ({ name, children }, spaces, fn, depth, indent) => {
    const newDepth = depth + 1;
    const newIndent = indent + 3;
    const value = fn(children, newDepth, newIndent);
    return [`${spaces}  ${name}: {`, value, `${spaces}  }`].join('\n');
  },
};

const buildDetailedFormat = (data, depth = 1, indent = 1) => data.map((node) => {
  const { state } = node;
  const spaces = getSpaces(depth, indent);
  return mapped[state](node, spaces, buildDetailedFormat, depth, indent);
}).join('\n');


export default (data) => ['{', buildDetailedFormat(data), '}'].join('\n');
