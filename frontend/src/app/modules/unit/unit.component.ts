import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ISelectionModel } from 'src/app/models/ui/dropDownSelectionModel';
import { IUnitOfMeasure } from 'src/app/models/UnitOfMeasure';
import { OthersService } from 'src/app/services/others.service';
import { TableComponent } from '../common/table/table.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent {
/**
     * It represent Table component reference
     * @see {@link TableComponent}
     */
@ViewChild(TableComponent ) table: any=TableComponent ; 

/**
 * It Trigger data in Client Table
 */
dtTrigger: Subject<any> = new Subject<any>();
isFloorManager:Boolean =false;

isPending: boolean = false;

isInProgress: boolean = false;

HeadArray:any[]=[
  {'head':'Product','field':'product'},{'head':'Quantity','field':'quantity'},{'head':'Iron (Kg)','field':'ironRequired'},
  {'head':'Nickel (Kg)','field':'ironRequired'}];

unitOfMeasureList:any[]=[];

uomModel:IUnitOfMeasure= {} as IUnitOfMeasure; 

modalID={
  add:'add',
  update:'update',
}

selectedUomModel:ISelectionModel={} as ISelectionModel;

// selectedAuthorList:any[]=[];


// nonSelecetedAuthorList:any[]=[];


tableHeight=100;

constructor(private otherService:OthersService,private _toastrService: ToastrService) { 
  }

ngOnInit(): void {
  this.getAllUom();
}

getAllUom(){
  this.otherService.getAllUnitOfMeasure().subscribe(data =>{ 
    console.log("data: ",data);
    
    this.unitOfMeasureList= data;
    this.dtTrigger.next(this.unitOfMeasureList);
  });
}
}
