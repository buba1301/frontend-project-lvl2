import getDetailed from './detailed';
import getPlain from './plain';
import getJson from './json';

const mapped = {
  detailed: getDetailed,
  plain: getPlain,
  json: getJson,
};

export default (data, format) => mapped[format](data);
