import * as yaml from 'js-yaml';

const getParsedData = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default: console.log('No such extension');
  }
  return 'Specify extension';
};

export default getParsedData;
