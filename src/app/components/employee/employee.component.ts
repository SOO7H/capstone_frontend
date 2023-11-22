import { CompanyService } from 'src/app/services/company.service';
import { Component,OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { EmployeeService } from 'src/app/services/employee.service';
import { CarService } from 'src/app/services/car.service';
import { TravellingcarService } from 'src/app/services/travellingcar.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  addressForm!: FormGroup<any>;
  availableCars!:any[];

  constructor(private carservice:CarService, private travellingcarservice: TravellingcarService ,  private companyservice: CompanyService, private employeeservice: EmployeeService, private router: Router, private route: ActivatedRoute,private fb:FormBuilder){
  }
  eid=this.route.snapshot.paramMap.get('id')!;
  employee:any;
  companyName:any;
  lat:number=0.0;
  long:number=0.0;
  bookedCar:any;
  ngOnInit(): void {

      this.addressForm = this.fb.group({
        pickupAddress:['',Validators.required],
        dropoffAddress:['',Validators.required]
      });
      this.carservice.getAvailable().subscribe(
        (res:any)=>{
          this.availableCars=res;
        }
      )
    this.employeeservice.getEmployeeDetails(this.eid).subscribe(
      (res:any)=>{
        this.employee=res;
        this.companyservice.getCompanyDetails(res.companyId).subscribe(
          (cres:any)=>{
            this.companyName=cres.name;
          }
        )

          this.carservice.getCarDetails(res.carId).subscribe(
            (cres:any)=>{
              this.bookedCar=cres;
            }
          )
        


      }
    );

  }
  onBook(){

    //get car with min distance
    let distMin:number=9999999999;
    let nearestCar:any;
      this.availableCars.forEach(car => {
        let curDist=this.distance(this.lat,this.long,car.lat, car.long);
        if(distMin>=curDist)
        {
          nearestCar=car;
          distMin=curDist;
        }
      });


      //book that car
    this.book(this.eid,nearestCar);

    this.bookedCar=nearestCar;


    window.location.reload();


  }
  book(eid:string, car:any)
  {
    let cid=car.id;
    car.availability=false;
    car.employeeId=this.eid;
    this.carservice.updateCar(cid,car).subscribe();
    this.employeeservice.getEmployeeDetails(eid).subscribe(
      (res:any)=>{
        res.carId=cid;
        this.employeeservice.updateEmployee(eid,res).subscribe();
      }
    );
  }
  distance(lat1:any, lon1:any, lat2:any, lon2:any) {
    const r = 6371; // km
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
  }
  endRide()
  {
    let car=this.bookedCar;
    car.availability=true;
    car.employeeId="";
    this.carservice.updateCar(car.id,car).subscribe();
    this.employeeservice.getEmployeeDetails(this.eid).subscribe(
      (res:any)=>{
        res.carId="";
        this.employeeservice.updateEmployee(this.eid,res).subscribe();
      }
    );
    window.location.reload();
  }
}
