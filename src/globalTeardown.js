import {stopMysqlServer} from "./mysqlServer";

module.exports = async function() {
  await stopMysqlServer()
}