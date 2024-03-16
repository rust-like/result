const { expect } = require('chai');
const { try_async, Result } = require('..');

describe('try_async', () => {
	function succeed(value) {
		return () => value
	}
	function fail(message = 'testing', error = Error) {
		return () => { throw new error(message) }
	}
	it('Returns a Promise.', () => {
		expect(try_async(succeed())).to.be.instanceOf(Promise)
		expect(try_async(fail())).to.be.instanceOf(Promise)
	})
	it('The promise contains a Result.', async () => {
		expect(await try_async(succeed())).to.be.instanceOf(Result)
		expect(await try_async(fail())).to.be.instanceOf(Result)
	})
	it('If no Error: returns an Ok Result with the proper value.', async () => {
		const no_val = await try_async(succeed())
		expect(no_val.ok()).to.be.true
		expect(no_val.unwrap_or(1)).to.be.undefined
		const one_val = await try_async(succeed(1))
		expect(one_val.ok()).to.be.true
		expect(one_val.unwrap_or(2)).to.equal(1)
		const complexType = { complex: 'type' }
		const complex_val = await try_async(succeed(complexType))
		expect(complex_val.ok()).to.be.true
		expect(complex_val.unwrap_or('')).to.equal(complexType)
	})
	it('If an Error happens: returns an Err Result with the error.', async () => {
		const no_val = await try_async(fail())
		expect(no_val.ok()).to.be.false
		expect(no_val.unwrap_err()).to.be.instanceOf(Error)
		const one_val = await try_async(fail(1))
		expect(one_val.ok()).to.be.false
		expect(one_val.unwrap_err()).to.be.instanceOf(Error)
		const complexType = { complex: 'type' }
		const complex_val = await try_async(fail(complexType))
		expect(complex_val.ok()).to.be.false
		expect(complex_val.unwrap_err()).to.be.instanceOf(Error)
	})
})
