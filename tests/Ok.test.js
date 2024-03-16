const { expect } = require('chai');
const { Ok, Result } = require('..');

describe('Ok', () => {
	it('Creates a Result instance.', () => {
		expect(Ok()).to.be.instanceOf(Result)
		expect(Ok(1)).to.be.instanceOf(Result)
		expect(Ok({ complex: 'type' })).to.be.instanceOf(Result)
	})
	it('The instance is an Ok variant.', () => {
		expect(Ok().ok()).to.be.true
		expect(Ok(1).ok()).to.be.true
		expect(Ok({ complex: 'type' }).ok()).to.be.true
	})
	it('The instance has the correct data.', () => {
		expect(Ok().get_data()).to.be.undefined
		expect(Ok(1).get_data()).to.equal(1)
		const complexType = { complex: 'type' }
		expect(Ok(complexType).get_data()).is.equal(complexType)
	})
})
