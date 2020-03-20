
import parse from './parsers';
import buildDifference from './buildDifference';
import mapped from './formaters';

const getDiff = (filePath1, filePath2, format = 'string') => {
  const content1 = parse(filePath1);
  const content2 = parse(filePath2);

  const difference = buildDifference(content1, content2);

  return mapped[format](difference);
};

export default getDiff;
