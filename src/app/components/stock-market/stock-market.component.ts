import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Stock, StockResolved } from '../../models/stock';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss']
})
export class StockMarketComponent implements OnInit {

  stocks: Stock[];
  error: string;
  day: number;
  currentDate: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { stocks: StockResolved }) => {
        this.error = data.stocks.error;
        if (!this.error) {
          this.stocks = data.stocks.stocks;
          this.setUpTable();
        }
      });
  }

  setUpTable() {
    this.day = 1;
    this.currentDate = Date.now();
    for (let i = 0; i < this.stocks.length; i++) {
      this.stocks[i].currentPrice = this.stocks[i].price;
    }
  }

  inflateStockClick(stock: Stock) {
    stock.currentPrice = stock.currentPrice ? stock.currentPrice + this.getChange(stock) : stock.price + this.getChange(stock);
    stock.currentPrice = Number(stock.currentPrice.toFixed(2));
    this.calculateStockChange(stock);
  }

  crashStockClick(stock: Stock) {
    if (stock.currentPrice == 0.00) return;
    stock.currentPrice = stock.currentPrice ? stock.currentPrice - this.getChange(stock) : stock.price - this.getChange(stock);
    stock.currentPrice = Number(stock.currentPrice.toFixed(2));
    stock.currentPrice = stock.currentPrice < 0 ? 0.00 : stock.currentPrice
    this.calculateStockChange(stock);
  }

  forwardDayClick() {
    this.day += 1;
    this.currentDate = this.currentDate + (24 * 60 * 60 * 1000);

    for (let i = 0; i < this.stocks.length; i++) {
      let stock = this.stocks[i];

      let change = this.generateRandomNumber(10);
      stock.currentPrice = stock.currentPrice ? stock.currentPrice + ((change / 100) * stock.currentPrice) : stock.price + ((change / 100) * stock.price);
      stock.currentPrice = Number(stock.currentPrice.toFixed(2));
      stock.currentPrice = stock.currentPrice < 0 ? 0.00 : stock.currentPrice
      this.calculateStockChange(stock);
    }
  }

  getChange(stock: Stock) {
    let change = this.generateRandomNumberRange(5, 25);
    if (stock.currentPrice && stock.currentPrice > 0.01) {
      return (change / 100) * stock.currentPrice;
    } else {
      return (change / 100) * stock.price;
    }
  }

  generateRandomNumberRange(min: number, max: number): number {
    let num = Math.floor(Math.random() * max) + min;
    return num;
  }

  generateRandomNumber(change: number): number {
    let num = Math.floor(Math.random() * change) + 1;
    return num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
  }

  calculateStockChange(stock: Stock) {
    stock.change = stock.currentPrice - stock.price;
    stock.percentChange = (stock.change / stock.price) * 100;
    stock.percentChange = Number(stock.percentChange);
  }
}
