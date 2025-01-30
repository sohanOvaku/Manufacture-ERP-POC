import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { Subject } from 'rxjs';
import { IOrders } from 'src/app/models/Orders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISelectionModel } from 'src/app/models/ui/dropDownSelectionModel';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';

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

  HeadArray:any[]=[
    {'head':'Id','field':'id'},{'head':'Quantity','field':'quantity'},{'head':'Status','field':'status'},{'head':'Iron (kg)','field':'ironUsed'},
    {'head':'Nickel (kg)','field':'nickelUsed'},{'head':'Action','field':'action'}];

  orderList:any[]=[];

  orderModel:IOrders= {} as IOrders; 

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
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllOrders();

    this.orderForm = this.formBuilder.group({
      id: [null, Validators.required],
      status: ['PENDING', Validators.required],
      finishedWeight: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
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
    const quantity = formValue.quantity;

    // Call the service to make the API request
    this.orderService.add(quantity).subscribe(
      (response) => {
        this._toastrService.success('Order placed successfully');
        // Optionally, close the modal here if you're using Bootstrap's modal handling
        this.table.rerender();
        // Additional logic to update the UI after placing the order
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
    

    // Set the form values for selected order
    this.orderForm.setValue({
      id: order.id,
      status: order.status,
      finishedWeight: order.finishedWeight || 0
    });

    // Trigger modal open (assuming you are using Bootstrap)
    // $('#' + this.modalID.update).modal('show');
  }

  // Handle the form submission to update the order
  updateOrder(formValue: any): void {
    const { id, status, finishedWeight } = formValue;

    console.log("formValue: ", formValue);
    console.log("formValue: ", formValue);
    // Call the service to update the order
    this.orderService.updateById(this.orderModel.id, status, finishedWeight).subscribe(
      (response) => {
        this._toastrService.success('Order updated successfully');
        
        // Optionally, refresh the order list or update UI here
        this.getAllOrders();
      },
      (error) => {
        this._toastrService.error('Failed to update order');
      }
    );
  }

  resetForm(){
    this.orderForm.reset();
  }

  resetAll(){
    // this.selectedOrderModel=[];
    
  }
  /**
   * This method reset the data table every time we leave the page attached to the component.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
