const env = (name: string): string | boolean | number | undefined => {
  const value = import.meta.env[`WSK_${name}`];

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value === 'null') {
    return undefined;
  }

  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }

  return value;
};

export default env;
