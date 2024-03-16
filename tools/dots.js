const dots = (() => {
	let dots;
	let intervalId;

	return {
		start: () => {
			dots = 0;
			intervalId = setInterval(async () => {
				if(3 < ++dots) {
					process.stdout.moveCursor(-3, 0);
					process.stdout.write('\x1b[K');
					dots = 0;
				} else {
					process.stdout.write('.');
				}
			}, 750)
		},
		end: () => {
			if(!intervalId) return;

			clearInterval(intervalId);

			process.stdout.moveCursor(-dots, 0);
			process.stdout.write('\x1b[K');
			process.stdout.write('... done.\n');
		}
	}
});

module.exports = dots;
