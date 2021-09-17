import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import * as yaml from 'js-yaml';

const genDiff = (filepath1, filepath2) => {
  const file1Extension = path.extname(filepath1);
  const file2Extension = path.extname(filepath2);
  let keys1;
  let entries1;
  let keys2;
  let entries2;
  if (file1Extension === '.json' && file2Extension === '.json') {
    const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const parsedData1 = JSON.parse(data1);
    keys1 = Object.keys(parsedData1);
    entries1 = Object.entries(parsedData1);

    const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const parsedData2 = JSON.parse(data2);
    keys2 = Object.keys(parsedData2);
    entries2 = Object.entries(parsedData2);
  } else if (file1Extension === '.yaml' || file2Extension === '.yaml' || file1Extension === '.yml' || file2Extension === '.yml') {
    const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const parsedData1 = yaml.load(data1);
    keys1 = Object.keys(parsedData1);
    entries1 = Object.entries(parsedData1);

    const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const parsedData2 = yaml.load(data2);
    keys2 = Object.keys(parsedData2);
    entries2 = Object.entries(parsedData2);
  }

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
