
import parser from './parsers';
import difference from './difference';
import toString from './formaters/toString';
import plain from './formaters/plain';
import json from './formaters/json';

const mapped = {
  string: (data) => toString(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};

const getDiff = (filePath1, filePath2, format = 'string') => {
  const file1 = parser(filePath1);
  const file2 = parser(filePath2);
  return mapped[format](difference(file1, file2));
};

export default getDiff;
