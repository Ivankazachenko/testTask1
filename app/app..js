import * as app from './app..js'
import path from 'path'

export * as config from './config/config..js'
export * as mod from './mod/mod..js'
export * as utils from './utils/utils..js'

// Creating tables in the database
await app.utils.pg._file(path.join(path.resolve(), 'app', '- file', 'wbData..sql'))


const { utils: { date }, mod: { wb, googleSheet } } = app

const start = async () => {
  // The current date
  const dateCurrent = date.current()

  // Getting data from the WB
  await wb.parser.run(dateCurrent)

  // Updating data in Google tables
  await googleSheet.run(dateCurrent)
}

start()
setInterval(async () => start(), app.config.wb.period)

console.log("All migrations and seeds have been run")


