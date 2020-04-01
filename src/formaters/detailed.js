
const indent = 2;

const getSpaces = (depth, indentNum) => (depth === 1 ? ' '.repeat(indentNum ** depth) : ' '.repeat(indentNum ** depth + indentNum));

const stringify = (data, spaces) => {
  if (!(data instanceof Object)) {
    return `${data}`;
  }

  const newIndent = spaces.length + 6;
  const newDepth = 1;
  const newSpaces = getSpaces(newDepth, newIndent);

  const mapped = Object.keys(data).map((key) => `${newSpaces}${key}: ${data[key]}`).join('\n');
  return ['{', mapped, `${spaces}  }`].join('\n');
};

const mapped = {
  deleted: ({ name, value }, spaces) => `${spaces}- ${name}: ${stringify(value, spaces)}`,

  added: ({ name, value }, spaces) => `${spaces}+ ${name}: ${stringify(value, spaces)}`,

  unchanged: ({ name, value }, spaces) => `${spaces}  ${name}: ${stringify(value, spaces)}`,

  changed: ({ name, beforeValue, afterValue }, spaces) => {
    const addedValue = stringify(afterValue, spaces);
    const deletedValue = stringify(beforeValue, spaces);
    return [`${spaces}+ ${name}: ${addedValue}`, `${spaces}- ${name}: ${deletedValue}`].join('\n');
  },

  nested: ({ name, children }, spaces, fn, depth) => {
    const newDepth = depth + 1;
    const value = fn(children, newDepth);
    return [`${spaces}  ${name}: {`, value, `${spaces}  }`].join('\n');
  },
};

const buildDetailedFormat = (data, depth = 1) => {
  const spaces = getSpaces(depth, indent);
  return data.map((node) => {
    const { state } = node;
    return mapped[state](node, spaces, buildDetailedFormat, depth);
  }).join('\n');
};


export default (data) => `{\n${buildDetailedFormat(data)}\n}`;
