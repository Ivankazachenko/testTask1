import { config, utils } from '#app..js'

import { GoogleSpreadsheet } from 'google-spreadsheet';

const { sheetId, sheetName } = config.googleSheet

export const run = async (date) => {

  const data = await utils.pg.join(
    utils.pg.str.get('wbDelivery', { date }, { orderBy: { warehouseId: true } }),
    utils.pg.str.get('wbWarehouse', ''), {
    left: 'l.warehouseId = r.warehouseId',
    select: 'l.*, r.warehouseName, r.geoName',
  })

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

  // console.log(doc.title, sheet.title)

  // await sheet.clear()
  // await sheet.setHeaderRow(Object.keys(data[0]))

  await sheet.clearRows()
  await sheet.addRows(data)

}


