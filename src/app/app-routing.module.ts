import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StockMarketComponent } from './components/stock-market/stock-market.component';
import { StockMarketResolverService } from './services/stock-market-resolver/stock-market-resolver.service';


const routes: Routes = [
  {
    path: "",
    component: StockMarketComponent,
    resolve: {stocks: StockMarketResolverService}
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    StockMarketResolverService
  ]
})
export class AppRoutingModule { }
