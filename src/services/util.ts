import config from 'config'

export const getConfig = (key: string) => {
  const mode  = process.env.NODE_ENV;
  return config.get(`${mode}.${key}`);
}