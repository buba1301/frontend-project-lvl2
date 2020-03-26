import { getType, getData } from './utils';
import parse from './parsers';
import buildDifference from './buildDifference';
import getOutput from './formaters';

const getDiff = (filePath1, filePath2, format) => {
  const type1 = getType(filePath1);
  const type2 = getType(filePath2);

  const content1 = getData(filePath1);
  const content2 = getData(filePath2);

  const data1 = parse(type1, content1);
  const data2 = parse(type2, content2);

  const difference = buildDifference(data1, data2);

  return getOutput(difference, format);
};

export default getDiff;
