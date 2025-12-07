import { config } from '#app..js'

import { z } from 'zod'


const connectionSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

const knegConfigs = {
  development: {
    client: 'pg',
    connection:
    // connectionSchema.parse(
    {
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: process.env.POSTGRES_PORT ?? 5432,
      database: process.env.POSTGRES_DB ?? 'postgres',
      user: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? '00000000',
    }
    // )
    ,
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      // stub: 'src/config/knex/migration.stub.js',
      directory: './app/utils/knex',
      tableName: 'migrations',
      extension: 'js',
    },
    // seeds: {
    //   stub: 'src/config/knex/seed.stub.js',
    //   directory: './src/postgres/seeds',
    //   extension: 'js',
    // },
  },
  production: {
    client: 'pg',
    connection:
    // () =>connectionSchema.parse(
    {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    }
    // )
    ,
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      stub: 'dist/config/knex/migration.stub.js',
      directory: './dist/postgres/migrations',
      tableName: 'migrations',
      extension: 'js',
    },
    // seeds: {
    //   stub: 'src/config/knex/seed.stub.js',
    //   directory: './dist/postgres/seeds',
    //   extension: 'js',
    // },
  },
}

// export const knex = knegConfigs[config.app.nodeEnv]

export const knex = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  // pool: {
  //   min: 2,
  //   max: 10,
  // },
  migrations: {
    //   // stub: 'src/config/knex/migration.stub.js',
    directory: 'app/utils/knex/migrate',
    tableName: 'migrations',
    extension: 'js',
  },
  // seeds: {
  //   stub: 'src/config/knex/seed.stub.js',
  //   directory: './src/postgres/seeds',
  //   extension: 'js',
  // },
}

