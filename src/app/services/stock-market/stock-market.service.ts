import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'; 
import { Stock } from 'src/app/models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {

  constructor(private http: HttpClient) { }

  STOCK_MARKET_URL: string = "https://staging-api.brainbase.com/stocks.php";

  getStockMarketData(){
    return this.http.get<Stock[]>(
      this.STOCK_MARKET_URL);
  }
}
