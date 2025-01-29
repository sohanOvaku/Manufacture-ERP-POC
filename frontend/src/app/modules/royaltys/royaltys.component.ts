import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { IBookOwner } from 'src/app/models/bookOwner/bookOwner';
import { IRoyaltyDto } from 'src/app/models/royaltyDto/royaltyDto';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-royaltys',
  templateUrl: './royaltys.component.html',
  styleUrls: ['./royaltys.component.css']
})
export class RoyaltysComponent implements OnInit{
  
  royaltyDtoList:any[]=[];
  ownerList:any[]=[];
  ownerId!:number;
  royaltyModel:IRoyaltyDto={} as IRoyaltyDto;

  royaltyForm:any=FormGroup;

  totalRoyalty:number=0.00;

  modalID={
    add:'add',
    update:'update',
    delete:'delete'
  }

  constructor(private ownerService:OwnerService,private _toastrService: ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllOwners();

    this.royaltyForm = this.formBuilder.group({
      id:[]
    });
  }

  getAllOwners(){
    this.ownerService.getAll().subscribe(data =>{ 
      this.ownerList= data.payload;
      console.log(this.ownerList)
    });
  }

  onSubmit(form:any){
    this.ownerId=form.id;
    console.log(this.ownerId);
    this.getAllBookOwnerByOwnerId(this.ownerId);
  }
  getAllBookOwnerByOwnerId(id:number){
    this.ownerService.getAllRoyaltyByOwnerId(id).subscribe(data=>{
      this.royaltyDtoList=data.payload;
        for(let i=0;i<this.royaltyDtoList.length;i++){
          let temp=Number(this.royaltyDtoList[i].royalty);
          this.totalRoyalty=this.totalRoyalty+temp;          
        }
    },
    (err) => {
      this._toastrService.error("Something Wrong");
    });
  }

  resetData(){
    this.royaltyDtoList=[];
    this.totalRoyalty=0;
  }

}
