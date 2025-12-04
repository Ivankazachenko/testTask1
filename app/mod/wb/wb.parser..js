import { config, utils, mod } from '#app..js'


const { url, authorization, period } = config.wb
const { db } = mod.wb
const { query } = utils


/**
 * @param {{url:string, headers: object, json: object}} data
*/
export const run = async (dateСurrent) => {
  try {
    const res = await query.get({
      url: url + `?date=${dateСurrent}`, json: {}, headers: { authorization }
    })
    if (typeof res === 'object') {
      res.date = dateСurrent
      db.set(res)
    }
    console.log('data is obtained from the WB')
  } catch (err) { console.log(err) }
}



