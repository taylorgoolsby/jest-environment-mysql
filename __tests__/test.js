
jest.setTimeout(10000)

import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
})

beforeAll(() => {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve()
    })
  })
})

test('query local server', async () => {
  let sql = `
    CREATE DATABASE IF NOT EXISTS test;
  `
  await executeQuery(sql)

  sql = `SELECT SCHEMA_NAME AS \`database\` FROM INFORMATION_SCHEMA.SCHEMATA;`
  const result = await executeQuery(sql)
  const expected = [{database: 'test'}]
  expect(result).toEqual(expect.arrayContaining(expected))
})

afterAll(() => {
  return new Promise((resolve, reject) => {
    connection.end(err => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve()
    })
  })
})

function executeQuery(sql) {
  return new Promise(function(resolve, reject) {
    connection.query(sql, (err, rows, fields) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve(rows)
    })
  })
}