import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { SignupService } from 'src/app/services/signup.service';
import "tw-elements";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  userType: string = 'Companies';
  menu: boolean = false;
  signUpForm!: FormGroup;
  allcompanies?: any[];
  constructor(private fb: FormBuilder, private signup: SignupService, private router: Router, private companyservice: CompanyService) {
  }

  ngOnInit(): void {
    // this.signUpForm = this.fb.group({
    //   name: ['', Validators.required],
    //   username: ['', Validators.required],
    //   companyId: [''],
    //   phone: [''],
    //   email: ['', Validators.required],

    //   address: ['', Validators.required],
    //   password: ['', Validators.required],
    //   confpassword: ['', Validators.required]
    // },
    //   [this.matchPassword()]
    // );
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      companyId: new FormControl('', [

      ]),
      phone: new FormControl('', [
        Validators.required,
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]),
      confpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    },
    [this.matchPassword()]
    );

    this.companyservice.allCompanies().subscribe(
      (res: any) => {
        console.log("bbb");
        console.log(res);

        this.allcompanies = res;
      }
    );

  }
  matchPassword(): ValidatorFn {
    console.log("called");

    return (control: AbstractControl): ValidationErrors | null => {
      return control.get('password')?.value === control.get('confpassword')?.value ? null : { passwordMismatchError: true };
    }
  }
  menuState() {
    this.menu = !this.menu;
  }
  onClick(curUserType: string) {
    this.userType = curUserType;
  }
  onSignup() {

    if (this.signUpForm.valid) {
      this.signup.signUp(this.signUpForm.value, this.userType).subscribe({
        next: (() => {
          alert("SignUp Succesfull!!");
          this.signUpForm.reset();
          this.router.navigate(['/signin']);
        })
      })
    }
  }
}
