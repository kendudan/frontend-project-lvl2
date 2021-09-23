import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import getParsedData from '../src/parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1Extension = path.extname(filepath1);
  const file2Extension = path.extname(filepath2);

  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const parsedData1 = getParsedData(data1, file1Extension);
  const keys1 = Object.keys(parsedData1);
  const entries1 = Object.entries(parsedData1);

  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parsedData2 = getParsedData(data2, file2Extension);
  const keys2 = Object.keys(parsedData2);
  const entries2 = Object.entries(parsedData2);

  const result = [];
  entries1.forEach(([key1, value1]) => {
    if (!keys2.includes(key1)) {
      result.push(`- ${key1}: ${value1}`);
    }
    entries2.forEach(([key2, value2]) => {
      if (_.indexOf(keys1, key2) === -1) {
        if (!result.includes(`+ ${key2}: ${value2}`)) {
          result.push(`+ ${key2}: ${value2}`);
        }
      }
      if (key1 === key2 && value1 === value2) {
        result.push(`  ${key1}: ${value1}`);
      }
      if (key1 === key2 && value1 !== value2) {
        result.push(`- ${key1}: ${value1}`);
        result.push(`+ ${key1}: ${value2}`);
      }
    });
  });
  return `{\n  ${result.sort((a, b) => a.slice(2, 7).localeCompare(b.slice(2, 7))).join('\n  ')}\n}`;
};

export default genDiff;
