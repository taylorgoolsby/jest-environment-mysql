"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jestEnvironmentNode = require("jest-environment-node");

var _jestEnvironmentNode2 = _interopRequireDefault(_jestEnvironmentNode);

var _mysqlServer = require("./mysqlServer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MysqlEnvironment extends _jestEnvironmentNode2.default {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    await (0, _mysqlServer.mysqlServerReady)();
  }

  async teardown() {
    await (0, _mysqlServer.stopMysqlServer)();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}
exports.default = MysqlEnvironment;
//# sourceMappingURL=MysqlEnvironment.js.map
