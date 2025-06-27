const { getSignedQuantity } = require('../helpers/inventory');

describe('getSignedQuantity', () => {
    it('returns a positive quantity for inbound types', () => {
        expect(getSignedQuantity('restock', 5)).toBe(5);
        expect(getSignedQuantity('return', 10)).toBe(10);
        expect(getSignedQuantity('disperse_in', 7)).toBe(7);
    });

    it('returns a negative quantity for outbound types', () => {
    expect(getSignedQuantity('sale', 5)).toBe(-5);
    expect(getSignedQuantity('adjustment', 3)).toBe(-3);
    expect(getSignedQuantity('disperse_out', 10)).toBe(-10);
  });

  it('throws an error for invalid movement types', () => {
    expect(() => getSignedQuantity('donation', 5)).toThrow('Invalid movement type');
  });

  it('throws an error for non-positive quantity', () => {
    expect(() => getSignedQuantity('restock', 0)).toThrow('Quantity must be a positive number');
    expect(() => getSignedQuantity('sale', -5)).toThrow('Quantity must be a positive number');
  });
});