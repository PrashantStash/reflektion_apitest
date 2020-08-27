# Reflektion-api-test-assignment
A solution in Typescript to test multiple APIs with different Verbs

## Setup

1. Install [node.js version 10+](https://nodejs.org/). This project uses modern Javascript features, that will not work in older versions.
2. Clone this repository `https://github.com/PrashantStash/reflektion_apitest.git`
3. Install dependencies `npm install`
4. Run tests via `npm run test`. It will compile the typescript files, start the mocha tests and create a report
5. Run `npm run report` to build `html` report from results and it will be opened in your browser

## Project structure

* **src/** – source directory for all the typescript files, contains tests and some helper functions.
* **test/** – test files. The setup uses [Mocha].
    * **api.tests.ts** – simple test using mocha, chai(and its plugins) and allure
* **util/** - additional helpers
    * **AllureHelpers.ts** – Helper class for Allure Reporting
