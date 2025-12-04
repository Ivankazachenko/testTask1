import { utils } from '../../app..js'

const { knex, log } = utils.knex


export const latest = async () => {
  log.migrationResults("latest", await knex.migrate.latest())
}

export const rollback = async () => {
  log.migrationResults("rollback", await knex.migrate.rollback())
}

/**
 * @param {string} name 
 */
export const down = async (name) => {
  log.migrationResults("down", await knex.migrate.down({ name }))
}

/**
 * @param {string} name 
 */
export const up = async (name) => {
  log.migrationResults("up", await knex.migrate.up({ name }))
}

export const list = async () => {
  log.migrationList(await knex.migrate.list())
}

/**
 * @param {string} name 
 */
export const make = async (name) => {
  if (!name) {
    console.error("Please provide a migration name")
    process.exit(1)
  }
  console.log(await knex.migrate.make(name, { extension: "js" }))
}
