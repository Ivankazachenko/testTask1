
export const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
export const key = process.env.GOOGLE_PRIVATE_KEY
export const scopes = ['https://www.googleapis.com/auth/spreadsheets']

export const sheetId = process.env.GOOGLE_SHEET_ID.split(',')
export const sheetName = process.env.GOOGLE_SHEET_NAME ?? 'stocks_coefs'

