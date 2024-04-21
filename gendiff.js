const { Command } = require('commander');
const program = new Command();
const parse = require('./parser.js');

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.option('-f, --format [type]', 'output format')
	.arguments('<filepath1> <filepath2>')
	.action((filepath1, filepath2, options) => {
		const data1 = parse(filepath1);
		const data2 = parse(filepath2);
		console.log(data1);
		console.log(data2);
	})
	.option('-h, --help', 'output usage information')


program.parse(process.argv);

if (program.help) {
  program.help();
}

if (program.version) {
  program.version(); 
}
