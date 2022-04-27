
let startMysql
if (process.platform === 'win32') {
  startMysql = require('mysql-server-8-win-x64')
} else if (process.platform === 'darwin') {
  startMysql = require('mysql-server-8-osx-x64')
} else {
  startMysql = require('mysql-server-5.7-lin-x64')
}

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
    mysqlServerReady().then(() => {
      return mysqld.stop()
    }).then(() => {
      mysqld = null;
      startingPromise = null;
      readySet = false;
      stoppingPromise = null;
      resolve();
    }).catch(err => reject(err));
  })
  return stoppingPromise
}