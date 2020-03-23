import detailed from './detailed';
import plain from './plain';
import json from './json';

const mapped = {
  detailed: (data) => detailed(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};

export default mapped;
