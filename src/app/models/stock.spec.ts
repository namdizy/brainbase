import { Stock, StockResolved } from './stock';

describe('Stock', () => {
  it('should create an instance', () => {
    expect(new Stock()).toBeTruthy();
  });
});

describe('StockResolved', () => {
  it('should create an instance', () => {
    expect(new StockResolved()).toBeTruthy();
  });
});
