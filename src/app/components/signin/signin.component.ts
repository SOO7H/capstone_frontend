import { Component,OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userType: string = 'Companies';
  menu: boolean = false;
  allcompanies?:any[];
  signInForm! : FormGroup;
  constructor(private fb: FormBuilder, private signin: SigninService, private router: Router, private companyservice: CompanyService){
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({

      userName:['',Validators.required],
      companyId:[''],
      password:['',Validators.required]

    });
    this.companyservice.allCompanies().subscribe(
      (res:any)=>{
        this.allcompanies=res;
      }
    );
  }
  menuState()
  {
    this.menu = !this.menu;
  }
    onClick(curUserType:string){
      this.userType = curUserType;
    }
    onSignin(){
      if(this.signInForm.valid)
      {
        this.signin.signIn(this.signInForm.value,this.userType).subscribe({
          next:((user:any) =>{
            console.log(user);
            alert("SignIn Succesfull!!");
            this.signInForm.reset();
            this.router.navigate(['/'+this.userType,{id:user.id}]);
          })
        })
      }
    }
}
