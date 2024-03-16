const path = require('node:path');
const fs = require('node:fs');
const nodots = process.argv[3] === '--no-dots';
const processing = !nodots ? require('./dots')() : null;

if(!process.argv[2]) {
	process.stderr.write('Path required!\n');
	process.exit(1);
}
const dir = path.resolve(process.cwd(), process.argv[2]);
if(!fs.existsSync(dir)) {
	process.stdout.write(`Directory '${dir}' already deleted.\n`);
	process.exit(0);
}
process.stdout.write(`Deleting '${dir}'`);
if(!nodots) processing.start();
fs.rmSync(dir, { recursive: true });
if(!nodots) processing.end();
