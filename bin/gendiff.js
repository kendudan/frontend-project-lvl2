import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import getParsedData from '../src/parsers.js';
import stylish from '../src/formatter.js';
import plain from '../src/plain.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1Extension = path.extname(filepath1);
  const file2Extension = path.extname(filepath2);

  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const parsedData1 = getParsedData(data1, file1Extension);

  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parsedData2 = getParsedData(data2, file2Extension);

  const getData = (currValue1, currValue2) => {
    const keys1 = Object.keys(currValue1);
    const keys2 = Object.keys(currValue2);
    const allKeys = keys1.concat(keys2);
    const uniqueKeys = _.uniq(allKeys);
    return uniqueKeys.map((key) => {
      if (_.isEqual(currValue1[key], currValue2[key])) {
        return { key, type: 'common', value: currValue1[key] };
      }
      if (_.has(currValue1, key) && !_.has(currValue2, key)) {
        return { key, type: 'onlyFirst', value: currValue1[key] };
      }
      if (!_.has(currValue1, key) && _.has(currValue2, key)) {
        return { key, type: 'onlySecond', value: currValue2[key] };
      }
      if (_.isObject(currValue1[key]) && _.isObject(currValue2[key])) {
        const children = getData(currValue1[key], currValue2[key]);
        return { key, type: 'nested', children };
      }
      return {
        key, type: 'various', firstValue: currValue1[key], secondValue: currValue2[key],
      };
    });
  };
  const data = getData(parsedData1, parsedData2);
  console.log(data);
  if (format === 'stylish') {
    return stylish(data, 2);
  }
  if (format === 'plain') {
    return plain(data, '');
  }
  return 'Unknown format';
};

export default genDiff;
