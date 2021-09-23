import * as yaml from 'js-yaml';

const getParsedData = (data, extension) => {
  let parsedData;
  switch (extension) {
    case '.json':
      parsedData = JSON.parse(data);
      break;
    case '.yaml':
      parsedData = yaml.load(data);
      break;
    case '.yml':
      parsedData = yaml.load(data);
      break;
    default: console.log('No such extension');
  }
  return parsedData;
};

export default getParsedData;
