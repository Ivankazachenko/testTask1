
export * from './pg.str.el.select..js'


/**
 * @param table 
 * @param sql 
 * @returns FROM "table" или FROM ("sql") AS "table"
 */
export const from = (table, sql) => {
  let sqlQuery = 'FROM '
  sqlQuery += sql
    ? `(${sql}) AS "${table}" `
    : `"${table}" `
  return sqlQuery
}

/**
 * @param '{ collum1: val1, collum2: val2 }'
 * @param '[{ collum1: val1, collum2: val2 }, { collum1: val1, collum2: val2 }]'
 * @returns SELECT * FROM storeCart INSERT INTO "storeCart" ("collum1", "collum2") VALUES ('val1', 'val2'), ('val1', 'val2') RETURNING *
 */
export const insert = (table, data) => {
  let col = '', val = ''

  for (const collum of Object.keys(data)) {
    col += `"${collum}", `
    val += `${_val(data[collum])}, `
  }
  col = col.slice(0, -2) + ' '
  val = val.slice(0, -2) + ' '

  return /*sql*/`INSERT INTO "${table}" (${col}) VALUES (${val}) `
}

export const set = (data) => {
  let str = ''
  for (const col of Object.keys(data)) str += `"${col}" = ${_val(data[col])}, `
  str = str.slice(0, -2) + ' '
  return /*sql*/`SET ${str} `
}

/** Пример: where('userId', '=', userId, 'and', 'productId', '=', productId) */
export const where = function () {
  const sym = { '=': 1, '<>': 1, '!=': 1, '<': 1, '>': 1, '<=': 1, '>=': 1 }
  let sql = /*sql*/`WHERE `
  const num = arguments.length
  for (let i = 0; i < num; i++) {
    sql += sym[arguments[i + 1]]
      ? `"${arguments[i]}" `
      : sym[arguments[i - 1]] && typeof arguments[i] !== 'number'
        ? `'${arguments[i].split(`'`).join(``)}' `
        : `${arguments[i]} `
  }
  return sql
}

/**
 * @param data opts.orderBy {columName: truefalse} от A до Я; {columName: false} от Я до A
 */
export const orderBy = (data) => {
  let str = ''
  if (typeof data === 'object') {
    for (const colum of Object.keys(data))
      str += `"${colum}" ${data[colum] ? 'ASC' : 'DESC'},`
    str = str.slice(0, -1)
  } else if (typeof data === 'string') {
    str += data
  }

  return /*sql*/`ORDER BY ${str} `
}

export const del = () => /*sql*/`DELETE `

export const update = (table) => /*sql*/`UPDATE "${table}" `

export const returning = () => /*sql*/`RETURNING *`


export const _val = (value) => {
  if (typeof value === 'number') return `${value}`
  else if (value === 'null' || value === null) return `NULL`
  else if (value === 'CURRENT_TIMESTAMP') return `CURRENT_TIMESTAMP`
  else return `'${_valid(value)}'`
}

export const _valid = (value) => {
  if (typeof value === 'string') return value.replace(/'/g, '')
  return value
}
