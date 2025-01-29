import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    DataTablesModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
