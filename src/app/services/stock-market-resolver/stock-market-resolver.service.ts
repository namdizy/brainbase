import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

import { StockMarketService } from '../stock-market/stock-market.service';
import { StockResolved } from 'src/app/models/stock';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockMarketResolverService implements Resolve<Observable<StockResolved>> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockResolved> | Observable<Observable<StockResolved>> | Promise<Observable<StockResolved>> {
    return this.stockMarketService.getStockMarketData().pipe(
      take(1),
      map(stocks =>{
        const stockResolved: StockResolved=  {stocks:stocks}
        return stockResolved;
      }),
      catchError(error =>{
        const message = `Retrival error: ${JSON.stringify(error)}`;
        const stockResolved: StockResolved = {stocks: null, error: message}
        return of(stockResolved);
      })
    )
  }

  constructor(private stockMarketService: StockMarketService, private router: Router) { }
}
