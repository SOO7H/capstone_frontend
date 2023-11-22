import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private baseUrl:string = "https://localhost:7156/api/"
  constructor(private http: HttpClient, private router: Router) { }
  signIn(user:any, userType:string)
  {
    return this.http.post<any>(this.baseUrl+userType+"/signin",user);
  }
}
