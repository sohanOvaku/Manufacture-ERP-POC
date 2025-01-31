import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'src/app/login.guard';

const routes: Routes = [
  { path: "", component: LoginComponent,canActivate:[LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
