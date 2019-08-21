import { TestBed } from '@angular/core/testing';

import { StockMarketResolverService } from './stock-market-resolver.service';

describe('StockMarketResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockMarketResolverService = TestBed.get(StockMarketResolverService);
    expect(service).toBeTruthy();
  });
});
