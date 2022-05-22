const databases = {
  developement: 'ofertabest_site_test',
  test: 'ofertabest_site_test',
  production: 'ofertabest_site'
}

const hosts = {
  developement: '162.214.229.70' ,
  test: '162.214.229.70',
  production: '162.214.229.70'
}

console.log(`DATABASE SELECIONADO ${databases[process.env.NODE_ENV]}`)

export const type = 'postgres';
export const host = hosts[process.env.NODE_ENV];
export const port = 5432;
export const username = 'monteiro';
export const password = 'monteiro1';
export const database = databases[process.env.NODE_ENV];
export const synchronize = true;
export const logging = (process.env.NODE_ENV == 'production'  ? false : false);
export const entities = ['src/entity/**/*.ts'];
export const migrations = ['src/migration/**/*.ts'];
export const subscribers = ['src/subscriber/**/*.ts'];
export const cli = {
   entitiesDir: 'src/entity',
   migrationsDir: 'src/migration',
   subscribersDir: 'src/subscriber',
};