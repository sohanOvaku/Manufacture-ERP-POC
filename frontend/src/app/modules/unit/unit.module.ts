import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit.component';
import { TableModule } from '../common/table/table.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitRoutingModule } from './unit-routing.module';



@NgModule({
  declarations: [
    UnitComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    TableModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UnitModule { }
