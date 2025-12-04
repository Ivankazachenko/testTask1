


/**
 * @param select 'colum' => "colum"
 * @param select 'table1.colum' => "table1"."colum"
 * @param select 'table1.colum1, colum2' => "table1"."colum1", "colum2"
 * @param select 'colum1 AS colum2' => "colum1" AS "colum2"
 * @param select 'table1.colum1 AS colum2' => "table1"."colum1" AS "colum2"
 * @param select 'JSON_AGG:( table1.colum1 * colum2 ) AS colum' => JSON_AGG:( "table1"."colum1" * "colum2" ) AS "colum"
 * @param {*} table 'имя таблици' не обязательный параметр
 */
export const select = (str) => {
  let sql = ` SELECT `
  if (typeof str === 'string')
    sql += str.split('AS').map((colum) => valid(colum)).join('AS')
  else sql += '*'
  return sql
}

export const on = (str) => {
  let sql = ` ON `
  if (typeof str === 'string') {
    const arrAnd = []
    for (const s of str.split(' AND '))
      arrAnd.push(s.split(' OR ').map((colum) => valid(colum)).join(' OR '))
    sql += arrAnd.join(' AND ')
  } else sql += ''
  return sql
}

export const groupBy = (str) => {
  let sql = ''
  if (typeof str === 'string')
    sql += ` GROUP BY ` + valid(str)
  return sql
}



const valid = (str) => {
  let s = str

  let numStart
  let numEnd = 0
  s = s + ' '
  let arrIndex = []
  for (const i in s) {
    // if (Array.isArray(s.at(i).match(/[a-z0-9]/gi))) {
    if (/[a-z_0-9]/gi.test(s.at(i))) {
      if (typeof numStart === 'undefined') {
        numStart = i
        arrIndex.push(i)
      }
      numEnd = undefined
    } else if (typeof numEnd === 'undefined') {
      numEnd = i
      numStart = undefined
      arrIndex.push(i)
    }

    if (/[(]/gi.test(s.at(i))) arrIndex = arrIndex.slice(0, -2)
  }
  for (const i of arrIndex.reverse()) s = s.slice(0, i) + '"' + s.slice(i)
  return s
}


