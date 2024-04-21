const { Command } = require('commander');
const program = new Command();

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.option('-f, --format [type]', 'output format')
	.option('-h, --help', 'output usage information')

program.parse(process.argv);

if (program.help) {
  program.help();
}

if (program.version) {
  program.version(); 
}
