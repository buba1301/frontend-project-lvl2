import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import process from 'process';
import ini from 'ini';

const mapping = {
  yml: (data) => yaml.safeLoad(data),
  json: (data) => JSON.parse(data),
  ini: (data) => ini.parse(data),
};

export default (filePath) => {
  const pathToFile = path.resolve(process.cwd(), filePath);
  console.log(pathToFile);
  const type = path.extname(filePath).slice(1);
  const data = fs.readFileSync(pathToFile).toString();
  return mapping[type](data);
};
