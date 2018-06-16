import NodeEnvironment from 'jest-environment-node'
import {mysqlServerReady, stopMysqlServer} from "./mysqlServer";

export default class MysqlEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    await mysqlServerReady()
  }

  async teardown() {
    await stopMysqlServer()
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}