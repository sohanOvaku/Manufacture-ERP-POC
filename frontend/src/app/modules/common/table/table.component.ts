import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
/**
 * This is the component class of Common-Table Module
 * @author Sohan
 * @version 1.0
 * @since 4/1/2023
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , AfterViewInit{
  /**
   * This is a Instance of DataTable settings.
   */
  dtOptions: DataTables.Settings = {};
  
  /**
   * This is a Instance of DataTable Directives.
   */
  @ViewChild(DataTableDirective ,{static : false}) 
  dtElement : any=DataTableDirective ;
  
  /**
   * It represent table head.It is a input propery which get value from parent 
   */
  @Input() HeadArray :any[] = [];

  /**
   * It represent table body.It is a input propery which get value from parent 
   */
  @Input() BodyArray :any[] = [];

  /**
   * It represent table add modal.It is a input propery which get value from parent 
   */
  @Input() addModal:any;

  /**
   * It represent table update modal.It is a input propery which get value from parent 
   */
  @Input() updateModal:any;

  /**
   * It represent table delete modal.It is a input propery which get value from parent 
   */
  @Input() deleteModal:any;

  /**
   * It represent update event.It is a output property which send value to parent
   */
  @Output() onUpdate =new EventEmitter<any>();

  /**
   * It represent delete event.It is a output property which send value to parent
   */
  @Output() onDelete =new EventEmitter<any>();

  /**
   * It represent details view event.It is a output property which send value to parent
   */
  @Output() onDetailsView =new EventEmitter<any>();

  /**
   * It Trigger data in dataTable. It is a input property which get value form parent
   */
  @Input() dtTrigger:any;
  
  /**
   * It represent table height. It is a input property which get value form parent
   */
  @Input() tableHeight:number=470;

  /**
   * It is a get all event. It is a output property which send value to parent
   */
  @Output() gettAll:any=new EventEmitter<any>();

  /**
   * OnInit method for initialiaztion
   */
  ngOnInit(): void {}

  /**
   * AfterViewInit method for additional initialiaztion after component load
   */
  ngAfterViewInit(): void {
    // Datatable settings bind during child component view
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[5,10,15,20,25,30],
      processing: true,
      responsive: true,
      scrollY:this.tableHeight,
      scrollX:true,
      autoWidth:true,
    }
  }
  
  /**
   * This method is used to call update event
   * @param item - table data
   */
  update(item:any){
    this.onUpdate.emit(item);
  }

  /**
   * This method is used to call delete event
   * @param item - table data
   */
  delete(item:any){
    this.onDelete.emit(item);
  }

  /**
   * This method is used to call detailsView event
   * @param item - table data
   */
  detailsView(item:any){
    this.onDetailsView.emit(item);
  }

  /**
   * This method destroy the datatable and re initialize
   */
  rerender() 
  {
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>
    {
      dtInstance.destroy();
      this.gettAll.emit();
    })
  }

}

