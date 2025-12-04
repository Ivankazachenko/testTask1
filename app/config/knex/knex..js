import { config } from '#app..js'

import { z } from 'zod'


const connectionSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

const NODE_ENV = config.env.NODE_ENV ?? 'development';

const knegConfigs = {
  development: {
    client: 'pg',
    connection: () =>
      connectionSchema.parse({
        host: config.env.POSTGRES_HOST ?? 'localhost',
        port: config.env.POSTGRES_PORT ?? 5432,
        database: config.env.POSTGRES_DB ?? 'postgres',
        user: config.env.POSTGRES_USER ?? 'postgres',
        password: config.env.POSTGRES_PASSWORD ?? '00000000',
      }),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      stub: 'src/config/knex/migration.stub.js',
      directory: './src/postgres/migrations',
      tableName: 'migrations',
      extension: 'ts',
    },
    seeds: {
      stub: 'src/config/knex/seed.stub.js',
      directory: './src/postgres/seeds',
      extension: 'js',
    },
  },
  production: {
    client: 'pg',
    connection: () =>
      connectionSchema.parse({
        host: config.env.POSTGRES_HOST,
        port: config.env.POSTGRES_PORT,
        database: config.env.POSTGRES_DB,
        user: config.env.POSTGRES_USER,
        password: config.env.POSTGRES_PASSWORD,
      }),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      stub: 'dist/config/knex/migration.stub.js',
      directory: './dist/postgres/migrations',
      tableName: 'migrations',
      extension: 'js',
    },
    seeds: {
      stub: 'src/config/knex/seed.stub.js',
      directory: './dist/postgres/seeds',
      extension: 'js',
    },
  },
}

// @ts-ignore
export const knex = knegConfigs[NODE_ENV]
