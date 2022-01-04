import _ from 'lodash';

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

export default getData;
