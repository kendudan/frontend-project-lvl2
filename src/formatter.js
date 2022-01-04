import _ from 'lodash';

const stylish = (currentValue, depth) => {
  console.log(currentValue);
  const replacer = ' ';
  const currentIndent = replacer.repeat(depth);
  const bracketIndent = replacer.repeat(depth - 2);
  const sortedCurrentValue = _.sortBy(currentValue, (o) => o.key);

  if (_.isPlainObject(currentValue)) {
    const entries = Object.entries(currentValue).map(([key, value]) => {
      if (typeof value === 'object') {
        return `${currentIndent}  ${key}: ${stylish(value, depth + 4)}`;
      }
      return `${currentIndent}  ${key}: ${value}`;
    });
    return [
      '{',
      ...entries,
      `${bracketIndent}}`,
    ].join('\n');
  }

  const lines = sortedCurrentValue.map((el) => {
    if (el.type === 'nested') {
      return `${currentIndent}  ${el.key}: ${stylish(el.children, depth + 4)}`;
    }
    if (el.type === 'various') {
      if (typeof el.firstValue === 'object') {
        return `${currentIndent}- ${el.key}: ${stylish(el.firstValue, depth + 4)}\n${currentIndent}+ ${el.key}: ${el.secondValue}`;
      }
      if (typeof el.secondValue === 'object' && el.secondValue !== null) {
        return `${currentIndent}- ${el.key}: ${el.firstValue}\n
        ${currentIndent}+ ${el.key}: ${stylish(el.secondValue, depth + 1)}`;
      }
      return `${currentIndent}- ${el.key}: ${el.firstValue}\n${currentIndent}+ ${el.key}: ${el.secondValue}`;
    }
    if (el.type === 'common') {
      return `${currentIndent}  ${el.key}: ${el.value}`;
    }
    if (el.type === 'onlyFirst') {
      if (typeof el.value === 'object') {
        return `${currentIndent}- ${el.key}: ${stylish(el.value, depth + 4)}`;
      }
      return `${currentIndent}- ${el.key}: ${el.value}`;
    }
    if (el.type === 'onlySecond') {
      if (typeof el.value === 'object') {
        return `${currentIndent}+ ${el.key}: ${stylish(el.value, depth + 4)}`;
      }
      return `${currentIndent}+ ${el.key}: ${el.value}`;
    }
    if (typeof el.value === 'object') {
      return `${currentIndent}${el.key}: ${stylish(el.value, depth + 4)}`;
    }
    return `${currentIndent}${el.key}: ${el.value}`;
  });
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
