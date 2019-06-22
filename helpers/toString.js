module.exports = (value) => {
  if (value == null) { return ''; }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return `${value}`;
};
