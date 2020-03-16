#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';


const program = commander;

program
  .version('1.1.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format', 'toString')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
