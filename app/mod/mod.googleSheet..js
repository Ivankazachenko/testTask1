import { config, utils } from '#app..js'

import { GoogleSpreadsheet } from 'google-spreadsheet';

const { sheetId, sheetName } = config.googleSheet
const { knex } = utils.knex

export const run = async (date) => {
  const data = await knex('wbDelivery').where('date', '=', date).orderBy('boxDeliveryCoefExpr', 'asc')
    .join('wbWarehouse', 'wbDelivery.warehouseId', 'wbWarehouse.warehouseId')
    .select('wbDelivery.*', 'wbWarehouse.warehouseName', 'wbWarehouse.geoName')

  const sheetIdArr = Array.isArray(sheetId) ? sheetId : [sheetId]
  for (const id of sheetIdArr) {
    setSheet({ sheetId: id, data })
  }
}


const setSheet = async ({ sheetId, data }) => {
  const doc = new GoogleSpreadsheet(sheetId, utils.google.auth)
  await doc.loadInfo() // loads document properties and worksheets

  let sheet = doc.sheetsByTitle['stocks_coefs'] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  if (typeof sheet === 'undefined') {
    sheet = await doc.addSheet({ title: sheetName });
  }


  await sheet.clearRows()
  await sheet.addRows(data)
}


