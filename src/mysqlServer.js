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
    startingPromise = mysqld.ready.then(() => {
      readySet = true
      startingPromise = null
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