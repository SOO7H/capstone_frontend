import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyComponent } from './components/company/company.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "Admins", component: AdminComponent },
  { path: "Vendors", component: VendorComponent },
  { path: "Employees", component: EmployeeComponent },
  { path: "Companies", component: CompanyComponent },
  { path: "", component: LandingComponent },
  { path: "admin", component: AdminComponent },
  { path: "map", component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
