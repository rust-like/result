const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const spawn = require('node:child_process').spawnSync;
const prompt = require('prompt-sync')({ sigint: true });

const processing = require('./dots')();
const original_package = require(path.resolve(process.cwd(), 'package.json'));
const build = path.resolve(process.cwd(), 'build');
const tests = path.resolve(process.cwd(), 'tests');
const license = path.resolve(process.cwd(), 'LICENSE');
const example = path.resolve(process.cwd(), 'example.js');
const readme = path.resolve(process.cwd(), 'README.md');

const _cwd = process.cwd();
process.chdir(os.tmpdir());
const tmp = path.resolve(process.cwd(), fs.mkdtempSync('.publish-build-'));
process.chdir(_cwd);

const clearTmp = () => fs.rmSync(tmp, { recursive: true });

(async () => {
try {
	const lib = path.join(tmp, 'lib');
	const legal = path.join(tmp, 'legal');
	fs.mkdirSync(lib);
	fs.mkdirSync(legal);

	fs.cpSync(build, lib, { recursive: true });
	fs.cpSync(license, path.join(legal, 'LICENSE'));
	fs.cpSync(example, path.join(tmp, 'example.js'));
	fs.cpSync(readme, path.join(tmp, 'README.md'));

	fs.writeFileSync(path.join(tmp, 'COPYING'),
		'Rust-like Result for Node.JS\n'
		+ 'Copyright (c) 2024 Nala.\n\n'

		+'Licensed under the Apache License, Version 2.0 (the "License");\n'
		+'you may not use this project except in compliance with the License.\n'
		+'You may obtain a copy of the License at\n\n'

		+'    http://www.apache.org/licenses/LICENSE-2.0\n\n'

		+'Unless required by applicable law or agreed to in writing, software\n'
		+'distributed under the License is distributed on an "AS IS" BASIS,\n'
		+'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n'
		+'See the License for the specific language governing permissions and\n'
		+'limitations under the License.\n'
	);


	const package = Object.create(null);
	package.name = original_package.name;
	package.version = original_package.version;
	package.description = original_package.description;
	package.author = original_package.author;
	package.license = original_package.license;
	if(original_package.dependencies)
		package.dependencies = original_package.dependencies;
	package.files = [
		"lib",
		"legal",
		"example.js"
	]
	package.repository = original_package.repository;
	package.bugs = original_package.bugs;
	package.homepage = original_package.homepage;

	package.main = 'lib/index.js';
	package.types = 'lib/index.d.ts';

	fs.writeFileSync(path.join(tmp, 'package.json'), JSON.stringify(package));

	process.stdout.write('Preparing tests!');
	processing.start();
	const tests_cp = path.join(tmp, 'tests');
	fs.cpSync(tests, tests_cp, { recursive: true });
	process.chdir(tmp);
	spawn('npm', ['install', 'chai@4.4.1', '--save-dev']);
	processing.end();
	spawn('npx', ['mocha', '"tests"'], { stdio: 'inherit' });
	spawn('npm', ['uninstall', 'chai']);
	fs.rmSync(tests_cp, { recursive: true });


	process.stdout.write(`Publish build created here '${tmp}'\n`);
	if(prompt('Proceed [y/N]? ').toLowerCase() !== 'y') {
		process.stdout.write('Cancelled.\n');
		clearTmp();
		process.exit(2);
	}

	process.stdout.write('Publishing now.');
	spawn('npm', ['publish', '--access', 'public'], { stdio: 'inherit' });
} catch(e) {
	process.stderr.write('Error!\n' + e.message + '\n')
	process.exit(1)
} finally {
	clearTmp();
}
})();
