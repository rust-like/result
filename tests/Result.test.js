const { expect, assert } = require('chai');
const { Ok, Err, Result, ResultError } = require('..');

const result = (outcome, ok_val, err_val) => outcome ? Ok(ok_val) : Err(err_val)

describe('Result', () => {
	it('Is a class.', () => {
		expect(Result.constructor).is.not.undefined
	})
	it('Has two symbols.', () => {
		expect(
			Object.getOwnPropertySymbols(new Result(true, 0)).length
		).to.equal(2)
	})
	it('The constructor functions match the exported ones.', () => {
		expect(Result.Err).to.equal(Err)
		expect(Result.Ok).to.equal(Ok)
	})
	describe('<Result>.ok', () => {
		it('Returns true if it\'s an Ok variant.', () => {
			const statusSymbol = Object.getOwnPropertySymbols(new Result(true, 0))[0];
			expect((new Result(true, 1))[statusSymbol]).to.be.true;
		})
		it('Returns false if it\'s an Err variant.', () => {
			const statusSymbol = Object.getOwnPropertySymbols(new Result(true, 0))[0];
			expect((new Result(false, 1))[statusSymbol]).to.be.false;
		})
	})

	describe('<Result>.match', () => {
		it('Executes the correct handler.', () => {
			const whatfn = (r) => {
				let fn = 0
				r.match(() => (fn = 1), () => (fn = 2))
				return fn;
			}
			expect(whatfn(result(true))).to.equal(1)
			expect(whatfn(result(false))).to.equal(2)
		})

		it('Passes the proper value to the handlers.', () => {
			expect(
				result(true, 'ok', 'err').match(ok => ok, err => err)
			).to.equal('ok')
			expect(
				result(false, 'ok', 'err').match(ok => ok, err => err)
			).to.equal('err')
		})
	})

	describe('<Result>.unwrap', () => {
		it('Returns the value if Ok.', () => {
			expect(() => Ok().unwrap()).to.not.throw()
			expect(Ok().unwrap()).to.be.undefined
			expect(() => Ok(1).unwrap()).to.not.throw()
			expect(Ok(1).unwrap()).to.equal(1)
			const complexType = { complex: 'type' }
			expect(() => Ok(complexType).unwrap()).to.not.throw()
			expect(Ok(complexType).unwrap()).to.equal(complexType)
		})

		it('Throw an Error if Err.', () => {
			expect(() => Err().unwrap()).to.throw(ResultError)
			expect(() => Err(1).unwrap()).to.throw(ResultError)
			const complexType = { complex: 'type' }
			expect(() => Err(complexType).unwrap()).to.throw(ResultError)
		})
	})

	describe('<Result>.unwrap_or', () => {
		it('Returns the value if Ok.', () => {
			expect(Ok().unwrap_or(-1)).to.not.equal(-1)
			expect(Ok(1).unwrap_or(2)).to.equal(1)
			const complexType = { complex: 'type' }
			const anotherComplexType = { another: 'complex-type' }
			expect(
				Ok(complexType).unwrap_or(anotherComplexType)
			).to.equal(complexType)
		})

		it('Returns the default if Err.', () => {
			expect(Err().unwrap_or(-1)).to.equal(-1)
			expect(Err(1).unwrap_or(2)).to.equal(2)
			const complexType = { complex: 'type' }
			const anotherComplexType = { another: 'complex-type' }
			expect(
				Err(complexType).unwrap_or(anotherComplexType)
			).to.equal(anotherComplexType)
		})
	})

	describe('<Result>.unwrap_err', () => {
		it('Returns the value if Err.', () => {
			expect(() => Err().unwrap_err()).to.not.throw()
			expect(Err().unwrap_err()).to.be.undefined
			expect(() => Err(1).unwrap_err()).to.not.throw()
			expect(Err(1).unwrap_err()).to.equal(1)
			const complexType = { complex: 'type' }
			expect(() => Err(complexType).unwrap_err()).to.not.throw()
			expect(Err(complexType).unwrap_err()).to.equal(complexType)
		})

		it('Throw an Error if Ok.', () => {
			expect(() => Ok().unwrap_err()).to.throw(ResultError)
			expect(() => Ok(1).unwrap_err()).to.throw(ResultError)
			const complexType = { complex: 'type' }
			expect(() => Ok(complexType).unwrap_err()).to.throw(ResultError)
		})
	})

	describe('<Result>.expect', () => {
		it('Calling expect in an ok result returns the value.', () => {
			assert(Ok(1).expect('blabla') === 1)
			assert(Ok().expect('blabla') === undefined)
			assert(Ok('THIS IS A TEST').expect('blabla') === 'THIS IS A TEST')
		})
		it('Calling expect in an err result throws an error with the proper message.', () => {
			function getErr(fn) {
				try {
					fn()
				} catch(e) {
					return e;
				}
			}
			expect(getErr(() => Err(1).expect('Not ok.'))).to.be.instanceOf(ResultError)
			assert(getErr(() => Err(1).expect('Not ok.')).message.endsWith('Not ok.'), 'The message does not match')
		})
	})
})
