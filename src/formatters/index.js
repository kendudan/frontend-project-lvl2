import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (data, formatName) => {
  let formattedData;
  switch (formatName) {
    case 'stylish':
      formattedData = stylish(data, 2);
      break;
    case 'plain':
      formattedData = plain(data, '');
      break;
    case 'json':
      formattedData = json(data);
      break;
    default: console.log('Unknown format');
  }
  return formattedData;
};

export default getFormatter;
