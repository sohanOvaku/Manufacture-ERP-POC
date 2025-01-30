import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _url:string = "http://localhost:8080/orders";//environment.API_BASE_URL+"/orders";

  constructor(private http:HttpClient) { }

  getAll(isActive:boolean=true):Observable<any>{
    return this.http.get<any>(this._url);
  }

  getById(id:number):Observable<any>{
    return this.http.get<any>(this._url+'/'+id);
  }

  add(quantity:number):Observable<any>{
    return this.http.post<any>(this._url+'?quantity='+quantity,null);
  }

  updateById(id:number,status:string, finishedWeight?:number):Observable<any>{
    // return this.http.put<any>(this._url+'/'+id'?status='+status+);
    let url = `${this._url}/${id}?`;
    // Add 'status' parameter if provided
    if (status) {
      url += `status=${status}`;
    }

    // Add 'finishedWeight' parameter if provided
    if (finishedWeight !== undefined || finishedWeight !== null) {
      if (url.includes('status') && status === "DONE") {
        url += `&finishedWeight=${finishedWeight}`;
      } else {
        url += `finishedWeight=${finishedWeight}`;
      }
    }
    console.log("URL: ", url);
    
    return this.http.put<any>(`${this._url}`,null);
  }
}
