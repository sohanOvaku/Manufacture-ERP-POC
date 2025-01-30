import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path: "books",loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule)
  },
  {
    path: "authors",loadChildren: () => import('./modules/authors/authors.module').then(m => m.AuthorsModule)
  },
  {
    path: "royalty-report",loadChildren: () => import('./modules/royaltys/royaltys.module').then(m => m.RoyaltysModule)
  },
  {
    path: "orders",loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
		path: '**', redirectTo: 'dashboard'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
