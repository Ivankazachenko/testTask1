import { config } from '#app..js'
import _knex from 'knex'

// export * as log from './knex.log..js'
// export * as migrate from './knex.migrate..js'
// export * as seed from './knex.seed..js'

export const knex = _knex(config.knex)
knex.migrate.latest()





