import {mysqlServerReady} from "./mysqlServer";

module.exports = async function() {
  await mysqlServerReady()
}