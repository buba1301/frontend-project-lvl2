
import parser from './parsers';
import parse from './parser';
import renderToString from './formaters/object';
import plain from './formaters/plain';


const mapped = {
  string: (data) => renderToString(data),
  plain: (data) => plain(data),
};

const getDiff = (filePath1, filePath2, format = 'string') => {
  const file1 = parser(filePath1);
  const file2 = parser(filePath2);
  return mapped[format](parse(file1, file2));
};

export default getDiff;
