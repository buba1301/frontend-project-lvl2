#!/usr/bin/env node

const program = require('commander');

program
  .version('1.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

if (program.format) console.log('%s', [program.format]);
