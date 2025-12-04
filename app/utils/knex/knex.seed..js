import { utils } from '../../app..js'

const { knex, log } = utils.knex

export const run = async () => {
  log.seedRun(await knex.seed.run());
}

/**
 * @param {string} name 
 */
export const make = async (name) => {
  if (!name) {
    console.error("Please provide a seed name");
    process.exit(1);
  }
  log.seedMake(await knex.seed.make(name));
}
