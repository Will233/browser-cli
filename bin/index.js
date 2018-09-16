#!/usr/bin/env node

/**
 * 命令行
 */

const program = require('commander')
const pageHandler = require('../src/browser.js')
console.log('run command...')

program.version('0.0.1')
  .option('-js, --script [xx.js]', 'run javascript file')
  .parse(process.argv)

if (program.script) {
  let script = program.script
  try {
    // pageHandler.test(script)
    pageHandler.runScript(script)
  } catch (e){
    console.log(e)
  }
}