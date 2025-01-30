import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OthersService {
  private _url:string = "http://localhost:8080";//environment.API_BASE_URL;

  constructor(private http:HttpClient) { }

  getIron():Observable<any>{
    return this.http.get<any>(`${this._url}/irons`);
  }

  getNickels():Observable<any>{
    return this.http.get<any>(`${this._url}/nickels`);
  }

  getUnitOfMeasure():Observable<any>{
    return this.http.get<any>(`${this._url}/units/steel_bottles`);
  }

  getOrderStats():Observable<any>{
    return this.http.get<any>(`${this._url}/orders/stats`);
  }

}
