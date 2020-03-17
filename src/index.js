
import parse from './parsers';
import difference from './getDifference';
import toString from './formaters/toString';
import plain from './formaters/plain';
import json from './formaters/json';

const mapped = {
  toString: (data) => toString(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};

const getDiff = (filePath1, filePath2, format = 'toString') => {
  const content1 = parse(filePath1);
  const content2 = parse(filePath2);
  return mapped[format](difference(content1, content2));
};

export default getDiff;
