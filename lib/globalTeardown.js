"use strict";

var _mysqlServer = require("./mysqlServer");

module.exports = async function () {
  await (0, _mysqlServer.stopMysqlServer)();
};
//# sourceMappingURL=globalTeardown.js.map
