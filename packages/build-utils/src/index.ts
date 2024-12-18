import process from "node:process";

export function compileCSP(records: Record<string, string | string[]>) {
  return Object.entries(records)
    .map(([k, v]) => {
      const values = (
        Array.isArray(v) ? v : [v]
      ).join(' ');

      return `${k} ${values};`;
    })
    .join(' ');
}

export function getNodeEnv() {
  const VALID_ENVS = [ 'production', 'development' ]

  const nodeEnv = String(process.env.NODE_ENV || '')
    .toLowerCase()

  if (!VALID_ENVS.includes(nodeEnv)) {
    throw new Error('Invalid NODE_ENV')
  }

  return nodeEnv
}