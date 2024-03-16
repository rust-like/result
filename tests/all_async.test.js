const { expect } = require('chai');
const { Ok, Err, all_async, Result } = require('..');

describe('all_async', () => {
	function succeed() {
		return Ok()
	}
	function fail() {
		return Err()
	}
	const one_hundred_array = (generator) => {
		const array = []
		for(let i = 0; i < 100; i++)
			array.push(generator());
		return array;
	}
	const one_hundred_succeds = one_hundred_array(() => succeed())
	const one_hundred_succeds_one_fail =
		one_hundred_array(() => succeed())
		.concat(fail())

	it('Returns a Promise.', () => {
		expect(all_async([succeed()])).to.be.instanceOf(Promise)
		expect(all_async([fail()])).to.be.instanceOf(Promise)
		expect(all_async(one_hundred_succeds_one_fail)).to.be.instanceOf(Promise)
	})
	it('The promise contains a Result.', async () => {
		expect(await all_async([])).to.be.instanceOf(Result)
		expect(await all_async([succeed(),succeed(),succeed()])).to.be.instanceOf(Result)
		expect(await all_async([succeed(),succeed(),fail()])).to.be.instanceOf(Result)
		expect(await all_async([succeed(),fail(),succeed()])).to.be.instanceOf(Result)
		expect(await all_async([fail(),fail(),fail()])).to.be.instanceOf(Result)
		expect(await all_async([
			succeed(),succeed(),succeed(),succeed(),fail()
		])).to.be.instanceOf(Result)
		expect(await all_async(one_hundred_succeds)).to.be.instanceOf(Result)
		expect(await all_async(one_hundred_succeds_one_fail)).to.be.instanceOf(Result)
	})
	it('If at least one result is Err, return Err', async () => {
		expect((await all_async([succeed(),succeed(),fail()])).ok()).to.be.false
		expect((await all_async([succeed(),fail(),succeed()])).ok()).to.be.false
		expect((await all_async([fail(),fail(),fail()])).ok()).to.be.false
		expect((await all_async([
			succeed(),succeed(),succeed(),succeed(),fail()
		])).ok()).to.be.false
		expect((await all_async(one_hundred_succeds_one_fail)).ok()).to.be.false
	})
	it('If all results are Ok, return Ok', async () => {
		expect((await all_async([])).ok()).to.be.true
		expect((await all_async([succeed(),succeed(),succeed()])).ok()).to.be.true
		expect((await all_async(one_hundred_succeds)).ok()).to.be.true
	})
})
