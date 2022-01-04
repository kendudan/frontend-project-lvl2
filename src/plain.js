import _ from 'lodash';

const getProperty = (acc, key) => {
  if (acc === '') {
    return key;
  }
  return `${acc}.${key}`;
};

const getValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (currentValue, path) => {
  const sortedCurrentValue = _.sortBy(currentValue, (o) => o.key);
  const lines = sortedCurrentValue.map((el) => {
    const propertyName = getProperty(path, el.key);
    if (el.type === 'nested') {
      return plain(el.children, propertyName);
    }
    if (el.type === 'onlyFirst') {
      return `Property '${propertyName}' was removed`;
    }
    if (el.type === 'onlySecond') {
      return `Property '${propertyName}' was added with value: ${getValue(el.value)}`;
    }
    if (el.type === 'various') {
      return `Property '${propertyName}' was updated. From ${getValue(el.firstValue)} to ${getValue(el.secondValue)}`;
    }
    return '';
  });
  return lines.filter((item) => item !== '').join('\n');
};

export default plain;
