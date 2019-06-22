module.exports = (value) => {
  if (value == null) { return ''; }

  if (typeof value === 'string') {
    return value;
  }

  return null;
};
