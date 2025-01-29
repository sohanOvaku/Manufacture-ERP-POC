import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoyaltysComponent } from './royaltys.component';

const routes: Routes = [
  { path: '', component: RoyaltysComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoyaltysRoutingModule { }
