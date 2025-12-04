// @ts-nocheck
import { utils } from '#app..js'

export * as el from './pg.str.el..js'

const { el } = utils.pg.str



export const add = function (table, data) {
  let sql = ''
  sql += el.insert(table, valid(data))
  sql += el.returning()
  return sql
}

export const get = function (table, where, opts) {
  try {

    const { select } = arguments[2] ?? {}

    let arr = []
    where && Object.keys(valid(where)).forEach((colum, i) => {
      const temp = where[colum]
      const arrTemp = Array.isArray(temp) ? temp : [temp]

      i && arr.push('and')
      arrTemp.forEach((val, j) => {
        j && arr.push('or')
        arr.push(colum, '=', val)
      })
    })

    if (where && !arr.length) return []

    let sql = el.select(select)
    sql += el.from(table)
    arr.length && (sql += el.where(...arr))
    opts?.orderBy && (sql += el.orderBy(opts.orderBy))
    opts?.groupBy && (sql += el.groupBy(opts.groupBy))

    return sql
  } catch (err) { console.log(err) }
}

export const set = function (table, where, set, opts = { sql: undefined }) {
  let arr = []
  Object.keys(where).forEach((colum, i) => {
    const val = where[colum]
    i && arr.push('and')
    arr.push(colum, '=', val)
  })
  let sql = ''
  sql += el.update(table)
  sql += el.set(valid(set))
  sql += el.where(...arr)
  sql += el.returning()
  return sql
}

export const del = function (table, where) {
  let arr = []
  Object.keys(where).forEach((colum, i) => {
    const val = where[colum]
    i && arr.push('and')
    arr.push(colum, '=', val)
  })
  let sql = ''
  sql += el.del()
  sql += el.from(table)
  sql += el.where(...arr)
  sql += el.returning()
  return sql
}


/**
 * Название таблиц в join левая (l) правая (r) пример: 
 * 
 * opts.select: 'r.groupId, JSON_AGG(r.access) AS accessTeam',
 * opts.on: 'l.groupId = r.groupId',
 * opts.groupBy: 'r.groupId'
 */
export const join = function (sqlL, sqlR, opts) {
  const fn = function (cb, sqlL, sqlR, opts) {

    const type = {
      inner: 'INNER',
      left: 'LEFT',
      right: 'RIGHT',
      fullOuter: 'FULL OUTER'
    }

    let on
    let typeName = type.inner
    for (const key in type) {
      if (typeof opts[key] !== 'undefined') {
        on = opts[key]
        typeName = type[key]
        break
      }
    }

    let sql = el.select(opts.select)
    sql += ` FROM (${sqlL}) AS "l" ${typeName} JOIN (${sqlR}) AS "r" `
    // sql += ` FROM (${sqlL}) AS "l" ${opts.type ?? 'inner'} JOIN (${sqlR}) AS "r" `
    sql += el.on(on)
    // sql += el.on(opts.on)
    sql += el.groupBy(opts.groupBy)
    // opts.where добавить

    if (arguments[5]) return cb(cb, sql, ...Object.values(arguments).slice(4))
    else return sql
  }

  return fn(fn, ...arguments)
}


const valid = (data) => {
  if (!Array.isArray(data) && typeof data === 'object') {
    const obj = {}
    for (const key of Object.keys(data)) obj[el._valid(key)] = el._valid(data[key])
    return obj
  }
}