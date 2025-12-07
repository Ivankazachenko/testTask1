import { config, utils } from '#app..js'

const { knex } = utils.knex


/**
 * @param {*} data 
 */
export const set = async (data) => {
  try {
    const { date } = data
    const warehouse = {}

    if (Array.isArray(data?.response?.data?.warehouseList)) {
      for (const obj of data?.response?.data?.warehouseList) {
        const warehouseId = await addWarehouse(obj)

        obj.warehouseId = warehouseId
        obj.date = date
        delete obj.warehouseName
        delete obj.geoName

        warehouse[warehouseId] ??= []
        warehouse[warehouseId].push(obj)
      }
      await setDelivery(warehouse)
    }
  } catch (err) { console.log(err) }
}




/**
 * We check if there is a warehouse in the database, if not, we add
 * @param {object} obj 
 */
const addWarehouse = async (obj) => {
  const { warehouseName, geoName } = obj
  let db = await knex('wbWarehouse').where('warehouseName', warehouseName)
  // let db = await utils.pg.get('wbWarehouse', { warehouseName })
  if (!db.length) {
    await knex('wbWarehouse').insert({ warehouseName, geoName })
    db = await knex('wbWarehouse').where('warehouseName', warehouseName)
  }
  // db = await utils.pg.add('wbWarehouse', { warehouseName, geoName })
  return db[0].warehouseId
}


const setDelivery = async (obj) => {
  try {
    if (typeof obj !== 'object') throw 'error неверные данные'
    for (const dataWb of Object.values(obj)) {
      const { warehouseId, date } = dataWb[0]
      const dataDb = await knex('wbDelivery').where('warehouseId', '=', warehouseId).and.where('date', '=', date).orderBy('deliveryId')
      // const dataDb = await utils.pg.get('wbDelivery', { warehouseId, date }, { orderBy: { deliveryId: true } })


      const num = dataWb.length > dataDb.length
        ? dataWb.length
        : dataDb.length

      for (let i = 0; i < num; i++) {
        if (dataWb[i] && dataDb[i]) {
          const { deliveryId } = dataDb[i]
          // console.log('set', deliveryId)
          await knex('wbDelivery').where('deliveryId', '=', deliveryId).update(dataWb[i])
          // utils.pg.set('wbDelivery', { deliveryId }, dataWb[i])

        } else if (typeof dataWb[i] === 'undefined') {
          const { deliveryId } = dataDb[i]
          // console.log('del', deliveryId)
          await knex('wbDelivery').where('deliveryId', '=', deliveryId).delete()
          // utils.pg.del('wbDelivery', { deliveryId })

        } else if (typeof dataDb[i] === 'undefined') {
          // console.log('add')
          await knex('wbDelivery').insert(dataWb[i])
          // utils.pg.add('wbDelivery', dataWb[i])

        }
      }
    }
  } catch (err) { console.log(err) }
}
