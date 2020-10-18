import { Express } from 'express';
import glob from 'glob'
import { getConfig } from './services/util';

export default async (app: Express) => {
  const extension = getConfig('mode') === 'development' ? 'ts' : 'js'
  const pattern   = `${__dirname}/routes/**/*Routes.${extension}`
  glob(pattern, {}, async (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach(async (file) => {
      const route = await import(file)
      route.init(app)
    });
  })
}