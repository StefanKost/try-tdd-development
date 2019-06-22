const toString = (value) => {
  if (value == null) { return ''; }

  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return `${value.map(toString)}`;
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return `${value}`;
};

module.exports = toString;
