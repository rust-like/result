const { expect } = require('chai');
const { Ok, Err, match } = require('..');

const result = (outcome, ok_val, err_val) => outcome ? Ok(ok_val) : Err(err_val)

describe('match', () => {
	it('Returns a function.', () => {
		expect(match(result(true))).to.be.a('function')
	})
	it('Executes the correct handler.', () => {
		const whatfn = (r) => {
			let fn = 0
			match(r)(() => (fn = 1), () => (fn = 2))
			return fn;
		}
		expect(whatfn(result(true))).to.equal(1)
		expect(whatfn(result(false))).to.equal(2)
	})

	it('Passes the proper value to the handlers.', () => {
		expect(match(result(true, 'ok', 'err'))(ok => ok, err => err)).to.equal('ok')
		expect(match(result(false, 'ok', 'err'))(ok => ok, err => err)).to.equal('err')
	})
})
