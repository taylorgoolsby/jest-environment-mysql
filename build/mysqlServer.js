'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopMysqlServer = exports.mysqlServerReady = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _mysqlServer = require('mysql-server-5.7-osx-x64');

var _mysqlServer2 = _interopRequireDefault(_mysqlServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mysqld = null;
let startingPromise = null;
let readySet = false;
let stoppingPromise = null;
const mysqlServerReady = exports.mysqlServerReady = function () {
  if (startingPromise) {
    return startingPromise;
  }

  if (!readySet) {
    mysqld = (0, _mysqlServer2.default)(null, { reinitialize: false });
    startingPromise = new _promise2.default((resolve, reject) => {
      mysqld.stderr.on('data', data => {
        if (!/\[Note]/.test(data)) {
          console.log(data.toString());
        }
        // console.log(data.toString())

        const ready = !!data.toString().match(/MySQL Community Server/);

        if (ready) {
          console.log('mysql server ready');
          readySet = true;
          startingPromise = null;
          resolve();
        }
      });
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
    mysqlServerReady().then(() => mysqld.stop());
    mysqld.on('close', () => {
      console.log('stopped mysql server');
      mysqld = null;
      startingPromise = null;
      readySet = false;
      stoppingPromise = null;
      resolve();
    });
  });
  return stoppingPromise;
};
//# sourceMappingURL=mysqlServer.js.map
