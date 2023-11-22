import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl:string = "https://localhost:7156/api/"
  constructor(private http: HttpClient, private router: Router) { }
  getCompanyDetails(cid:string)
  {
    return this.http.get<any>(this.baseUrl+"Companies/"+cid);
  }
  getEmployees(cid:string)
  {
    return this.http.get<any>(this.baseUrl+"Employees/company/"+cid);
  }
  allCompanies()
  {
    return this.http.get<any>(this.baseUrl+"Companies");
  }
  getCompaniesPendingApproval()
  {
    return this.http.get<any>(this.baseUrl+"Companies/pending");
  }
  getCompaniesWithoutVendor()
  {
    return this.http.get<any>(this.baseUrl+"Companies/unassigned");
  }
  getCompaniesApproved()
  {
    return this.http.get<any>(this.baseUrl+"Companies/approved");
  }
  updateApproval(cid:string, company:any)
  {
    return this.http.put<any>(this.baseUrl+"Companies/"+cid,company);
  }
}
