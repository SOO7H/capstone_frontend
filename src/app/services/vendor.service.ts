import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl:string = "https://localhost:7156/api/"
  constructor(private http: HttpClient, private router: Router) { }
  getVendorDetails(vid:string)
  {
    return this.http.get<any>(this.baseUrl+"Vendors/"+vid);
  }
  getCarsByVendor(vid:string)
  {
    return this.http.get<any>(this.baseUrl+"Cars/vendor/"+vid);
  }
  addCar(car:any)
  {
    return this.http.post<any>(this.baseUrl+"Cars/",car);
  }
  getVendorsPendingApproval()
  {
    return this.http.get<any>(this.baseUrl+"Vendors/pending");
  }
  getVendorsWithoutCompany()
  {
    return this.http.get<any>(this.baseUrl+"Vendors/unassigned");
  }
  updateApproval(vid:string, vendor:any)
  {
    return this.http.put<any>(this.baseUrl+"Vendors/"+vid,vendor);
  }
  getVendorsApproved()
  {
    return this.http.get<any>(this.baseUrl+"Vendors/approved");
  }
}
