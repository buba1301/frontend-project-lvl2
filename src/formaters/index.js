import toString from './toString';
import plain from './plain';
import json from './json';

const mapped = {
  string: (data) => toString(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};

export default mapped;
