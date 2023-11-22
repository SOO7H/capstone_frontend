import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl:string = "https://localhost:7156/api/"
  constructor(private http: HttpClient, private router: Router) { }
  getEmployeeDetails(eid:string)
  {
    return this.http.get<any>(this.baseUrl+"Employees/"+eid);
  }
  updateEmployee(eid:string, emp:any){
    return this.http.put<any>(this.baseUrl+"Employees/"+eid,emp);
  }
}
