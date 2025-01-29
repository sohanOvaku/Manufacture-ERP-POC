import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _url:string = environment.API_BASE_URL+"/books";

  constructor(private http:HttpClient) { }

  getAll(isActive:boolean=true):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(this._url+'?isActive='+isActive);
  }

  getById(id:number,isActive:boolean=true):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(this._url+'/'+id+'?isActive='+isActive);
  }

  add(data:any):Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(this._url,data);
  }

  updateById(id:any,data:any):Observable<ApiResponse<any>>{
    return this.http.put<ApiResponse<any>>(this._url+'/'+id,data);
  }

  deleteById(id:any):Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(this._url+'/'+id);
  }

  addAuthorByBookId(id:number,data:any):Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(this._url+'/'+id+'/authors',data);
  }

}
