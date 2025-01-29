import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoyaltysRoutingModule } from './royaltys-routing.module';
import { RoyaltysComponent } from './royaltys.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoyaltysComponent
  ],
  imports: [
    CommonModule,
    RoyaltysRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoyaltysModule { }
