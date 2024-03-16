const { expect } = require('chai');
const { try: _try, Result } = require('..');

describe('try', () => {
	function succeed(value) {
		return () => value
	}
	function fail(message = 'testing', error = Error) {
		return () => { throw new error(message) }
	}
	it('Returns a Result instance.', () => {
		expect(_try(succeed())).to.be.instanceOf(Result)
		expect(_try(fail())).to.be.instanceOf(Result)
	})
	it('If no Error: returns an Ok Result with the proper value.', () => {
		const no_val = _try(succeed())
		expect(no_val.ok()).to.be.true
		expect(no_val.unwrap_or(1)).to.be.undefined
		const one_val = _try(succeed(1))
		expect(one_val.ok()).to.be.true
		expect(one_val.unwrap_or(2)).to.equal(1)
		const complexType = { complex: 'type' }
		const complex_val = _try(succeed(complexType))
		expect(complex_val.ok()).to.be.true
		expect(complex_val.unwrap_or('')).to.equal(complexType)
	})
	it('If an Error happens: returns an Err Result with the error.', () => {
		const no_val = _try(fail())
		expect(no_val.ok()).to.be.false
		expect(no_val.unwrap_err()).to.be.instanceOf(Error)
		const one_val = _try(fail(1))
		expect(one_val.ok()).to.be.false
		expect(one_val.unwrap_err()).to.be.instanceOf(Error)
		const complexType = { complex: 'type' }
		const complex_val = _try(fail(complexType))
		expect(complex_val.ok()).to.be.false
		expect(complex_val.unwrap_err()).to.be.instanceOf(Error)
	})
})
