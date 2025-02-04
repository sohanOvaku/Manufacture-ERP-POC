import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { Subject } from 'rxjs';
import { IOrders } from 'src/app/models/Orders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISelectionModel } from 'src/app/models/ui/dropDownSelectionModel';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { CommonMethods } from 'src/app/common-methods';

export interface IOrdersReqDto {
  finishedWeight: number,
  status: string
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
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
    {'head':'Id','field':'id'},{'head':'Product','field':'product'},{'head':'Quantity','field':'quantity'},{'head':'Status','field':'status'},{'head':'Iron','field':'ironUsed'},
    {'head':'Nickel','field':'nickelUsed'}];

  orderList:any[]=[];

  orderModel:IOrders= {} as IOrders; 

  orderDto: IOrdersReqDto = {} as IOrdersReqDto;

  orderForm:any=FormGroup;

  modalID={
    add:'add',
    update:'update',
  }

  selectedOrderModel:ISelectionModel={} as ISelectionModel;

  // selectedAuthorList:any[]=[];
  

  // nonSelecetedAuthorList:any[]=[];


  tableHeight=100;

  constructor(private orderService:OrdersService,private _toastrService: ToastrService,
    private formBuilder:FormBuilder) { 
      this.isFloorManager = CommonMethods.getItem("role") === "FLOOR_MANAGER"? true : false;
      if(this.isFloorManager){
      this.HeadArray.push({'head':'Action','field':'action'});
      }
    }

  ngOnInit(): void {
    this.getAllOrders();

    this.orderForm = this.formBuilder.group({
      id: [null, Validators.required],
      uomId: [null, Validators.required],
      status: ['PENDING', Validators.required],
      finishedWeight: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  transformString(input: string): string {
    return input
      .split('_') // Split by underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(' '); // Join with space
  }

  getAllOrders(){
    this.orderService.getAll().subscribe(data =>{ 
      console.log("data: ",data);
      
      this.orderList= data;
      this.orderList = data.map((order: { billOfMaterial: { ironUsed: any; nickelUsed: any; }; }) => ({
        ...order,  // Spread existing order properties
        ironUsed: order.billOfMaterial ? order.billOfMaterial.ironUsed : 'N/A',
        nickelUsed: order.billOfMaterial ? order.billOfMaterial.nickelUsed : 'N/A'
      }));
  
      this.dtTrigger.next(this.orderList);
    });
  }


  onSubmit(formValue: any): void {
    const {quantity,uomId} = formValue;
    
    // Call the service to make the API request
    this.orderService.add(quantity,uomId).subscribe(
      async (response) => {
        this._toastrService.success('Order placed successfully');
        if(this.orderList.length == 0){
          await this.orderService.getById(response.id).subscribe((data) => {
            const transformedOrder = {
              ...data,
              ironUsed: data.billOfMaterial ? data.billOfMaterial.ironUsed : 'N/A',
              nickelUsed: data.billOfMaterial ? data.billOfMaterial.nickelUsed : 'N/A'
            };
            this.orderList.push(transformedOrder);
            this.dtTrigger.next(this.orderList);
          });
        }else{
          // Optionally, close the modal here if you're using Bootstrap's modal handling
          this.table.rerender();
        }
      },
      (error) => {
        this._toastrService.error('Failed to place order');
      }
    );
  }

  updateRequest(order: any): void {
    console.log("Selected : ",order);
    
    this.resetForm();
    this.orderModel = order;
    this.orderModel.billOfMaterial.ironUsed = order.ironUsed;
    this.orderModel.billOfMaterial.nickelUsed = order.nickelUsed;

    this.isPending = order.status === "PENDING";
    this.isInProgress = order.status === "IN_PROGRESS";
    

    // Set the form values for selected order
    this.orderForm.setValue({
      id: order.id,
      status: order.status,
      finishedWeight: order.finishedWeight || 0
    });
  }

  // Handle the form submission to update the order
  // updateOrder(formValue: any): void {
  //   const { id, status, finishedWeight } = formValue;
  //   this.orderDto.finishedWeight = formValue.finishedWeight;
  //   this.orderDto.status = formValue.status;
    
  //   console.log("formValue: ", formValue);
  //   console.log("orderDto: ", this.orderDto);
  //   this.orderService.update(this.orderModel.id, this.orderDto).subscribe(
  //     (response) => {
  //       this._toastrService.success('Order updated successfully');
  //       this.table.rerender();
  //     },
  //     (error) => {
  //       this._toastrService.error('Failed to update order');
  //     }
  //   );
  // }

  updateOrder(formValue: any): void {
    const { id, status, finishedWeight } = formValue;
  
    // Prepare update request
    this.orderDto.finishedWeight = finishedWeight;
    this.orderDto.status = status;
  
    // If PENDING → Move to IN_PROGRESS
    if (this.isPending) {
      this.orderDto.status = "IN_PROGRESS";
    }
  
    // If IN_PROGRESS → Move to DONE
    if (this.isInProgress) {
      if (!finishedWeight || finishedWeight <= 0) {
        this._toastrService.error("Finished weight must be greater than 0!");
        return;
      }
      this.orderDto.status = "DONE";
    }
  
    console.log("Updating order:", this.orderDto);
  
    this.orderService.update(this.orderModel.id, this.orderDto).subscribe(
      (response) => {
        this._toastrService.success("Order updated successfully");
        this.table.rerender();
      },
      (error) => {
        this._toastrService.error("Failed to update order");
      }
    );
  }

  resetForm(){
    this.orderForm.reset();
  }

  resetAll(){
    // this.selectedOrderModel=[];
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
