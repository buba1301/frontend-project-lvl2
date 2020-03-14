#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('1.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'toString');

program.parse(process.argv);
