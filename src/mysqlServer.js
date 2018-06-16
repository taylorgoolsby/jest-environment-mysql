import startMysql from "mysql-server-5.7-osx-x64";

let mysqld = null
let startingPromise = null
let readySet = false
let stoppingPromise = null
export const mysqlServerReady = function() {
  if (startingPromise) {
    return startingPromise
  }

  if (!readySet) {
    mysqld = startMysql(null, {reinitialize: false})
    startingPromise = new Promise((resolve, reject) => {
      mysqld.stderr.on('data', (data) => {
        if (!/\[Note]/.test(data)) {
          console.log(data.toString())
        }
        // console.log(data.toString())

        const ready =
          !!data.toString().match(/MySQL Community Server/);

        if (ready) {
          console.log('mysql server ready')
          readySet = true
          startingPromise = null
          resolve()
        }
      })
    })
    return startingPromise
  } else {
    return Promise.resolve(true)
  }
}

export const stopMysqlServer = function() {
  if (stoppingPromise) {
    return stoppingPromise
  }

  stoppingPromise = new Promise((resolve, reject) => {
    mysqlServerReady().then(() => mysqld.stop())
    mysqld.on('close', () => {
      console.log('stopped mysql server')
      mysqld = null
      startingPromise = null
      readySet = false
      stoppingPromise = null
      resolve()
    })
  })
  return stoppingPromise
}