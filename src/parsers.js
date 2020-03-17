import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import process from 'process';
import ini from 'ini';

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (filePath) => {
  const pathToFile = path.resolve(process.cwd(), filePath);
  const type = path.extname(filePath).slice(1);
  const data = fs.readFileSync(pathToFile).toString();
  return mapping[type](data);
};
