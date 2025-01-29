import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonMessage } from 'src/app/common-message';
import { IAuthor } from 'src/app/models/auhtor/author';
import { IBookAuthorDto } from 'src/app/models/bookAuhtor/bookAuhorDto';
import { INominee } from 'src/app/models/nominee/nominee';
import { ISelectionModel } from 'src/app/models/ui/dropDownSelectionModel';
import { AuthorService } from 'src/app/services/authors/author.service';
import { BookService } from 'src/app/services/books/book.service';
import { TableComponent } from '../common/table/table.component';
// import { IAuthor } from 'src/app/models/author/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
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
    {'head':'Id','field':'id'},{'head':'Name','field':'name'},{'head':'Phone Number ','field':'phoneNo'},
    {'head':'Vital Status','field':'vitalStatus'},{'head':'Status','field':'status'},{'head':'Action','field':'action'}];
  
  authorList:any[]=[];

  authorModel:IAuthor= {} as IAuthor; 

  authorForm:any=FormGroup;

  modalID={
    add:'add',
    update:'update',
    delete:'delete'
  }

  selectedAuthorModel:ISelectionModel={} as ISelectionModel;

  bookAuthorModel:IBookAuthorDto={} as IBookAuthorDto;

  selectedAuthorList:any[]=[];
  

  nonSelecetedAuthorList:any[]=[];

  /**
   * It is used to store Service records
   */
  selectedNomineeList:any[]=[];

  nomineeModel:INominee={} as INominee;

  tableHeight=100;

  // selectedselectedNomineeList:any[]=[];

  constructor(private authorService:AuthorService,private _toastrService: ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllAuthors();

    this.authorForm = this.formBuilder.group({
      id:[''],
      name:[''],
      phoneNo:[''],
      isAlive:[''],
      isActive:[''],
      nominee:this.formBuilder.group({
        name:[''],
        phoneNo:[''],
      })
    });
  }

  setClientFormValues(data:any){
    console.log(data)
    this.authorForm.setValue({
      id: data.id,
      name: data.name,
      phoneNo: data.phoneNo,
      isActive: data.isActive,
      isAlive:data.isAlive,
      nominee:{
        name:null,
        phoneNo:null
      }
    });
    
  }

  getAllAuthors(){
    this.authorService.getAll(false).subscribe(data =>{ 
      this.authorList= data.payload;
      this.dtTrigger.next(this.authorList);
    });
  }

  onSubmit(form:any){
    //checking form is valid or not
    if(!this.authorForm.valid) {
      this._toastrService.error("Something Wrong");
    } 
    else {
      this.authorModel=form;
      //calling service
      this.authorService.add(this.authorModel).subscribe(data => {
        //add response in array
        this.authorList.push(data.payload);
        this.processAfterSubmit(data.payload);
        this._toastrService.success("Successfully Created");
        //reset form fields
        this.resetForm();
        //delete table previous instance and recreate
        this.table.rerender();
      },
        (err) => {
          this._toastrService.error("Something Wrong");
        }
      );
    }
  }

  updateRequest(item:any){
    this.resetForm();
    if(item.address==null){
      item.address={};
    }
    this.authorModel=item;
    this.setClientFormValues(this.authorModel);
  }

  /**
   * On click of submit button in update form update existing Client record
   * @param form -form fields values
   */
  updateAuthor(form:any){
    //checking form valid or not
    if(!this.authorForm.valid) {
      this._toastrService.error("Something Wrong");
    } 
    else {
      this.authorModel=form;
      //calling service
      this.authorService.updateById(this.authorModel.id,this.authorModel).subscribe(data => {
        this._toastrService.success("Successfully Updated");
        this.processAfterSubmit(data.payload);
        //reset form fields
        this.resetForm();
        //delete table previous instance and recreate
        this.table.rerender();
        },
        (err) => {
          this._toastrService.error("Something Wrong");
        }
      );
    }
  }

  deleteRequest(item:any){
    this.authorModel=item;
    //checking Client is already deleted or not
    if(item.isActive==false){
      this._toastrService.warning("Already Deleted");
    }
  }


 /**
  * This method delete existing Client
  */
 deleteAuthor(){
    this.authorService.deleteById(this.authorModel.id).subscribe(data => {
      //calling service
      this._toastrService.success("Successfully");
      this.table.rerender();
      },
      (err) => {
        this._toastrService.error("Something Wrong");});
    
  }


  getAllNominees(){
    // this.authorService.getAll().subscribe(data =>{ 
    //   this.selectedNomineeList= data.payload;
    //   console.log(this.authorList);
    //   //checking service is selected or not
    //   this.sortAllNonSelectedAuthor();
    // });
  }

  sortAllNonSelectedAuthor(){
    console.log(this.selectedAuthorList);
    // this.nonSelecetedAuthorList=this.auhorList.filter(item=> !this.selectedAuthorList.some(data=>
    //   data.model.authorId==item.id));
  }

  checkInList(list:any,id:string,name:string):boolean{
    let checker=true;
    for(let i=0;i<list.length;i++){
      //checking...
      if(list[i].id==id && list[i].name==name){
        checker=true;
        break;
      }
      else{
        checker=false;
      }
    }
    return checker;
  }

  removeFromSelectedList(id:any){
    this.selectedNomineeList.splice(id,1);
  }

  addNomineeInList(form:any){
    console.log(form)
    if(form.name==null || form.phoneNo==null){
      this._toastrService.error(CommonMessage.getErrorSomethingNotRight());
    }
    else{
      this.nomineeModel=form;
      console.log(this.nomineeModel);
      this.selectedNomineeList.push(this.nomineeModel);
      this.nomineeModel={} as INominee;
      console.log(this.selectedNomineeList);
      //split id and name here
      // let authorData=String(form.authorId).split("+");
      // check service is exist in the list or not
      // if(this.checkInList(this.selectedNomineeList,authorData[0],authorData[1])==true){
      //   //change form serviceId after extract data
      //   form.authorId=authorData[0];
      //   console.log(form)
      //   //convert form data to planService model
      //   let tempBookAuthorModel:IBookAuthorDto=form;
      //   console.log(tempBookAuthorModel);
      //   //create a temporary reference of selection model
      //   const tempSelectedBookAuthorModel={} as ISelectionModel;
      //   //add planservice data and name in selection model
      //   tempSelectedBookAuthorModel.model=tempBookAuthorModel;
      //   tempSelectedBookAuthorModel.name=authorData[1];
      //   //add planservice in list
      //   this.selectedAuthorList.push(tempSelectedBookAuthorModel);
      //   //Sort to remove all selected services from list
      //   this.sortAllNonSelectedAuthor();
          
      // }else{
      //   this._toastrService.error(CommonMessage.getErrorNoDataAvailable());
      // }
    }
    //reset form field value of limits and serviceId
    this.authorForm.controls['nominee'].controls['name'].reset();
    this.authorForm.controls['nominee'].controls['phoneNo'].reset();
  }

  addNomineeByAuthorPhoneNo(phoneNo:number,data:any){
    this.authorService.addNomineeByAuthorPhoneNo(phoneNo,data).subscribe(data =>{},
    (err) => {
      this._toastrService.error(CommonMessage.getErrorAddFailedByName("Author"))});
  }

  processAfterSubmit(auhtor:IAuthor){
    //fetch selected service
    for(let i=0;i<this.selectedNomineeList.length;i++){
      this.nomineeModel=this.selectedNomineeList[i];
      //add service in plan by planId
      this.addNomineeByAuthorPhoneNo(auhtor.phoneNo,this.nomineeModel);
    }
    
    //make badge selection array null after submit
    this.selectedAuthorList=[];
    //reset form
    this.resetForm();
  }

  resetForm(){
    this.authorForm.reset();
  }

  resetAll(){
    this.selectedAuthorList=[];
    
  }
  /**
   * This method reset the data table every time we leave the page attached to the component.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
