import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import process from 'process';

const mapping = {
  yml: (data) => yaml.safeLoad(data),
  json: (data) => JSON.parse(data),
};

export default (filePath) => {
  const pathToFile = path.resolve(process.cwd(), filePath);
  console.log(pathToFile);
  const type = path.extname(filePath).slice(1);
  console.log(type);
  const data = fs.readFileSync(pathToFile).toString();
  console.log(data);
  return mapping[type](data);
};
