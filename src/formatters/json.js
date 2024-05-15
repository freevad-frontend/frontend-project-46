const getJson = (value) => {
  if (!Array.isArray(value)) {
    return value;
  }

  return JSON.stringify(value, null, 2);
};

export default getJson;
