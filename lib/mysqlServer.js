'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopMysqlServer = exports.mysqlServerReady = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let startMysql;
if (process.platform === 'win32') {
  startMysql = require('mysql-server-5.7-win-x64');
} else {
  startMysql = require('mysql-server-5.7-osx-x64');
}

let mysqld = null;
let startingPromise = null;
let readySet = false;
let stoppingPromise = null;
const mysqlServerReady = exports.mysqlServerReady = function () {
  if (startingPromise) {
    return startingPromise;
  }

  if (!readySet) {
    mysqld = startMysql(null, { reinitialize: false });
    startingPromise = mysqld.ready.then(() => {
      readySet = true;
      startingPromise = null;
    });
    return startingPromise;
  } else {
    return _promise2.default.resolve(true);
  }
};

const stopMysqlServer = exports.stopMysqlServer = function () {
  if (stoppingPromise) {
    return stoppingPromise;
  }

  stoppingPromise = new _promise2.default((resolve, reject) => {
    mysqlServerReady().then(() => {
      return mysqld.stop();
    }).then(() => {
      mysqld = null;
      startingPromise = null;
      readySet = false;
      stoppingPromise = null;
      resolve();
    }).catch(err => reject(err));
  });
  return stoppingPromise;
};
//# sourceMappingURL=mysqlServer.js.map
