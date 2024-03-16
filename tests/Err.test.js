const { expect } = require('chai');
const { Err, Result } = require('..');

describe('Err', () => {
	it('Creates a Result instance.', () => {
		expect(Err()).to.be.instanceOf(Result)
		expect(Err(1)).to.be.instanceOf(Result)
		expect(Err({ complex: 'type' })).to.be.instanceOf(Result)
	})
	it('The instance is an Err variant.', () => {
		expect(Err().ok()).to.be.false
		expect(Err(1).ok()).to.be.false
		expect(Err({ complex: 'type' }).ok()).to.be.false
	})
	it('The instance has the correct data.', () => {
		expect(Err().get_data()).to.be.undefined
		expect(Err(1).get_data()).to.equal(1)
		const complexType = { complex: 'type' };
		expect(Err(complexType).get_data()).is.equal(complexType)
	})
})
