import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data, 2);
    case 'plain':
      return plain(data, '');
    case 'json':
      return json(data);
    default:
      console.log('Unknown format');
  }
  return 'Specify format';
};

export default getFormatter;
