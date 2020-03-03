#!/usr/bin/env node
import getDiff from ../src;

const program = require('commander');

program
  .version('1.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
  .action(getDiff(firstConfig, secondConfig));
program.parse(process.argv);

if (program.format) console.log('%s', [program.format]);