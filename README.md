# jest-environment-mysql

Deploys a MySQL 5.7 server running on your local machine at `localhost:3306`. The server starts up once for all test files before any of them run, and it automatically stops when all of your tests are done.

Currently, the only operating system supported is OSX x64.

* * *

### Installation

Update your Jest configuration:
```
{
  "globalSetup": "jest-environment-mysql/lib/globalSetup",
  "globalTeardown": "jest-environment-mysql/lib/globalTeardown"
}
```
