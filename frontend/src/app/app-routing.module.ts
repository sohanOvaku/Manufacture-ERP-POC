import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  // { path: 'login', canActivate:[LoginGuard], component: LoginComponent },
  {
    path:"dashboard",canActivate: [AuthGuard], component: DashboardComponent
  },{
    path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) 
  },
  // {
  //   path: "books",loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule)
  // },
  // {
  //   path: "authors",loadChildren: () => import('./modules/authors/authors.module').then(m => m.AuthorsModule)
  // },
  // {
  //   path: "royalty-report",loadChildren: () => import('./modules/royaltys/royaltys.module').then(m => m.RoyaltysModule)
  // },
  {
    path: "orders",canActivate: [AuthGuard], loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: "boms",canActivate: [AuthGuard], loadChildren: () => import('./modules/unit/unit.module').then(m => m.UnitModule)
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
