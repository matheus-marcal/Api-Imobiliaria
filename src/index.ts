import {ApplicationConfig} from '@loopback/core';
import {ApirestImobiliariaApplication} from './application';

export {ApirestImobiliariaApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ApirestImobiliariaApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
