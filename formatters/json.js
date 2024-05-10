const getJson = (value) => {
  if (!Array.isArray(value) || (Array.isArray(value) && value.length === 0)) {
    return value;
  }

  return JSON.stringify(value, null, 2);
};

export default getJson;
