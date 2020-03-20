import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import process from 'process';
import ini from 'ini';

const parsers = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const getPathToFile = (filePath) => path.resolve(process.cwd(), filePath);
const getType = (filePath) => path.extname(filePath).slice(1);
const getData = (pathToFile) => fs.readFileSync(pathToFile).toString();

export default (filePath) => {
  const type = getType(filePath);
  const pathToFile = getPathToFile(filePath);
  const data = getData(pathToFile);
  return parsers[type](data);
};
