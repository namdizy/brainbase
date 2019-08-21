export class Stock {
    symbol: string;
    name: string;
    price: number;
    currentPrice: number;
    change: number;
    percentChange: number;
}

export class StockResolved {
   stocks: Stock[];
   error?: string; 
}