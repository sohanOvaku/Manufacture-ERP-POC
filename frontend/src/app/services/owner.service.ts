import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api/api-response';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private _url:string = environment.API_BASE_URL+"/owners";

  constructor(private http:HttpClient) { }

  getAll(isActive:boolean=true):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(this._url+'?isActive='+isActive);
  }

  getAllRoyaltyByOwnerId(id:number,isActive:boolean=true):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(this._url+'/'+id+'/royalty?isActive='+isActive);
  }

}
