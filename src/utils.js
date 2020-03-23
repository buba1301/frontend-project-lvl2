import path from 'path';
import fs from 'fs';

export const getType = (filePath) => path.extname(filePath).slice(1);

export const getData = (filePath) => {
  const pathToFile = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(pathToFile).toString();
};
