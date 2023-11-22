import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl:string = "https://localhost:7156/api/"
  constructor(private http: HttpClient, private router: Router) { }
  getAvailable()
  {
    return this.http.get<any>(this.baseUrl+"Cars/available");
  }
  getCarDetails(cid:string)
  {
    return this.http.get<any>(this.baseUrl+"Cars/"+cid);
  }
  updateCar(cid:string, car:any)
  {
    return this.http.put<any>(this.baseUrl+"Cars/"+cid,car);
  }
}
