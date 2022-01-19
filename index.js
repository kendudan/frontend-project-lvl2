import fs from 'fs';
import path from 'path';
import process from 'process';
import getParsedData from './src/parsers.js';
import getFormatter from './src/formatters/index.js';
import getData from './src/getData.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1Extension = path.extname(filepath1);
  const file2Extension = path.extname(filepath2);

  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const parsedData1 = getParsedData(data1, file1Extension);

  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parsedData2 = getParsedData(data2, file2Extension);

  const data = getData(parsedData1, parsedData2);

  return getFormatter(data, format);
};

export default genDiff;
