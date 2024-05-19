#!/usr/bin/env node

import { Command } from 'commander';
import getDiffFiles from '../src/compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const opts = program.opts();
    const { format } = opts;
    console.log(getDiffFiles(filepath1, filepath2, format));
  })
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

export default program;
