const path = require('node:path');
const spawn = require('node:child_process').spawn;
const processing = require('./dots')();

const tsconfig = path.resolve(process.cwd(), 'tsconfig.json');
process.stdout.write(`Compiling '${tsconfig}'`);
processing.start();
spawn('tsc', ['-p', `${tsconfig}`, '--removeComments'], { stdio: 'inherit' }).once('close', () => {
	spawn('tsc', ['-p', `${tsconfig}`, '--declaration', '--emitDeclarationOnly'], { stdio: 'inherit' }).once('close', () => {
		processing.end()
	});
});
