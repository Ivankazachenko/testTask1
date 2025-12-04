import { utils, config } from '#app..js'
import Pool from 'pg'
import fs from 'fs'

export * as str from './pg.str..js'

const { postgresHost, postgresUser, postgresPassword,
  postgresPort, postgresNameDb } = config.pg

const { str } = utils.pg

const pool = new Pool.Pool({
  host: postgresHost,
  user: postgresUser,
  password: postgresPassword,
  port: postgresPort,
  database: postgresNameDb
})

pool.connect()

/**
 * @param {string} sql 
 */
export const _query = async (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql)
      .then((data) => { resolve(data.rows) })
      .catch((err) => { reject(err) })
  })
}

export const _file = async (path) => {
  const arrPath = Array.isArray(path) ? path : [path]
  for (const path of arrPath) {

    fs.readFile(path, "UTF-8", async (err, sql) => {
      try {
        if (err) throw err
        await _query(sql)
      } catch (err) {
        console.error("db", err)
      }
    })
  }
}

export const add = async function (table, data) {
  return await _query(str.add(...arguments))
}

/**
 * @param {*} table Название таблицы
 * @param {*} where {colum1: value1, colum2: value2} или ['colum1', '=', 'value1', '&&', 'colum2', '>', 'value2' ]
 * @param {*} opts.orderBy {columName: true} от A до Я; {columName: false} от Я до A
 * @param {*} opts.select * ('colum1' или ['colum1', 'colum2', 'colum3'])
 */
export const get = async function (table, where, opts) {
  return await _query(str.get(...arguments))
}

export const set = async function (table, where, set, opts) {
  return await _query(str.set(...arguments))
}

export const del = async function (table, where) {
  return await _query(str.del(...arguments))
}

/**
 * Название таблиц в join левая (l) правая (r) пример: 
 * 
 * opts.select: 'r.groupId, JSON_AGG(r.access) AS accessTeam',
 * opts.inner: 'l.groupId = r.groupId',
 * opts.groupBy: 'r.groupId'
 */
export const join = async function (sqlL, sqlR, { select, groupBy, inner, left, right, fullOuter, where }) {
  return await _query(str.join(...arguments))
}














