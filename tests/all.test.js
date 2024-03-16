const { expect } = require('chai');
const { Ok, Err, all, Result } = require('..');

describe('all', () => {
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

	it('Returns a Result instance.', () => {
		expect(all([])).to.be.instanceOf(Result)
		expect(all([succeed(),succeed(),succeed()])).to.be.instanceOf(Result)
		expect(all([succeed(),succeed(),fail()])).to.be.instanceOf(Result)
		expect(all([succeed(),fail(),succeed()])).to.be.instanceOf(Result)
		expect(all([fail(),fail(),fail()])).to.be.instanceOf(Result)
		expect(all([
			succeed(),succeed(),succeed(),succeed(),fail()
		])).to.be.instanceOf(Result)
		expect(all(one_hundred_succeds)).to.be.instanceOf(Result)
		expect(all(one_hundred_succeds_one_fail)).to.be.instanceOf(Result)
	})
	it('If at least one result is Err, return Err', () => {
		expect(all([succeed(),succeed(),fail()]).ok()).to.be.false
		expect(all([succeed(),fail(),succeed()]).ok()).to.be.false
		expect(all([fail(),fail(),fail()]).ok()).to.be.false
		expect(all([
			succeed(),succeed(),succeed(),succeed(),fail()
		]).ok()).to.be.false
		expect(all(one_hundred_succeds_one_fail).ok()).to.be.false
	})
	it('If all results are Ok, return Ok', () => {
		expect(all([]).ok()).to.be.true
		expect(all([succeed(),succeed(),succeed()]).ok()).to.be.true
		expect(all(one_hundred_succeds).ok()).to.be.true
	})
})
