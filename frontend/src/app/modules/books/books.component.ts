import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonMessage } from 'src/app/common-message';
import { IBook } from 'src/app/models/book/book';
import { IBookAuthorDto } from 'src/app/models/bookAuhtor/bookAuhorDto';
import { ISelectionModel } from 'src/app/models/ui/dropDownSelectionModel';
import { AuthorService } from 'src/app/services/authors/author.service';
import { BookService } from 'src/app/services/books/book.service';
import { TableComponent } from '../common/table/table.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
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
    {'head':'Id','field':'id'},{'head':'Name','field':'name'},{'head':'Price ','field':'price'},{'head':'Quantity ','field':'quantity'},
    {'head':'Status','field':'status'},{'head':'Action','field':'action'}];
  bookList:any[]=[];

  bookForm:any=FormGroup;

  authorModel:IBook= {} as IBook; 

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
   * It is used to store author records
   */
  auhorList:any[]=[];

  constructor(private bookService:BookService,private authorService:AuthorService,private _toastrService: ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.bookForm = this.formBuilder.group({
      id:[''],
      name:[''],
      price:[''],
      isActive:[''],
      quantity:[''],
      authors:this.formBuilder.group({
        authorId:[''],
        royalty:[''],
      })
    });
  }

  getAllBooks(){
    this.bookService.getAll(false).subscribe(data =>{ 
      this.bookList= data.payload;
      this.dtTrigger.next(this.bookList);
    });
  }

  getAllAuthors(){
    this.authorService.getAll().subscribe(data =>{ 
      this.auhorList= data.payload;
      //checking author is selected or not
      this.sortAllNonSelectedAuthor();
    });
  }

  sortAllNonSelectedAuthor(){
    console.log(this.selectedAuthorList);
    this.nonSelecetedAuthorList=this.auhorList.filter(item=> !this.selectedAuthorList.some(data=>
      data.model.authorId==item.id));
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
    this.selectedAuthorList.splice(id,1);
  }

  addAuthorInList(form:any){
    console.log(form)
    if(form.authorId==null || form.royalty==null){
      this._toastrService.error(CommonMessage.getErrorSomethingNotRight());
    }
    else{
      //split id and name here
      let authorData=String(form.authorId).split("+");
      // check author is exist in the list or not
      if(this.checkInList(this.auhorList,authorData[0],authorData[1])==true){
        //change form authorId after extract data
        form.authorId=authorData[0];
        console.log(form)
        let tempBookAuthorModel:IBookAuthorDto=form;
        console.log(tempBookAuthorModel);
        //create a temporary reference of selection model
        const tempSelectedBookAuthorModel={} as ISelectionModel;
        //add author data and name in selection model
        tempSelectedBookAuthorModel.model=tempBookAuthorModel;
        tempSelectedBookAuthorModel.name=authorData[1];
        //add author in list
        this.selectedAuthorList.push(tempSelectedBookAuthorModel);
        console.log(this.selectedAuthorList);
        //Sort to remove all selected authors from list
        this.sortAllNonSelectedAuthor();
          
      }else{
        this._toastrService.error(CommonMessage.getErrorNoDataAvailable());
      }
    }
    //reset form field value of limits and authorId
    this.bookForm.controls['authors'].controls['royalty'].reset();
    this.bookForm.controls['authors'].controls['authorId'].reset();
  }

  onSubmit(form:any){
    //checking form is valid or not
    if(!this.bookForm.valid) {
      this._toastrService.error("Something Wrong");
    } 
    else {
      this.authorModel=form;
      //calling author
      this.bookService.add(this.authorModel).subscribe(data => {
        //add response in array
        this.bookList.push(data.payload);
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

  addAuthorByBookId(id:number,data:any){
    this.bookService.addAuthorByBookId(id,data).subscribe(data =>{},
    (err) => {
      this._toastrService.error(CommonMessage.getErrorAddFailedByName("Author"))});
  }

  processAfterSubmit(book:IBook){
    //fetch selected author
    for(let i=0;i<this.selectedAuthorList.length;i++){
      this.bookAuthorModel=this.selectedAuthorList[i].model;
      this.bookAuthorModel.bookId=book.id;
      //add author in plan by planId
      this.addAuthorByBookId(book.id,this.bookAuthorModel);
    }
    
    //make badge selection array null after submit
    this.selectedAuthorList=[];
    //reset form
    this.resetForm();
  }

  resetForm(){
    this.bookForm.reset();
  }

  resetSubFormBadgeList(){
    //make badge selection array null after submit
    this.selectedAuthorList=[];
  }

  /**
   * This method reset the data table every time we leave the page attached to the component.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
