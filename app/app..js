import * as app from './app..js'

export * as config from './config/config..js'
export * as utils from './utils/utils..js'
export * as mod from './mod/mod..js'


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


