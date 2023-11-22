import { CompanyService } from 'src/app/services/company.service';
import { Component,OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { VendorService } from 'src/app/services/vendor.service';

interface car{
  registrationNo: string;
  lat:number;
  long:number;
  vendorId:string;
  address:string;
  availability:boolean;
}

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})



export class VendorComponent implements OnInit{
  constructor(private fb: FormBuilder, private vendorservice: VendorService, private router: Router, private route: ActivatedRoute){
  }
  vid=this.route.snapshot.paramMap.get('id')!;
  vendor:any;
  cars?:any[];
  displayedColumns: string[] = ['registrationNo'];
  addCarForm!:FormGroup;

  ngOnInit(): void {
    this.addCarForm = this.fb.group({
      registrationNo:['',Validators.required]
    });
    this.vendorservice.getVendorDetails(this.vid).subscribe(
      (res:any)=>{
        this.vendor=res;
      }
    );
    this.vendorservice.getCarsByVendor(this.vid).subscribe(
      (res:any)=>{
        this.cars=res;
      }
    );

  }
  onAddCar(){
    let carData: car = this.addCarForm.getRawValue();
    carData.address = this.vendor.address;
    carData.vendorId = this.vid;


    if(this.addCarForm.valid)
    {
      this.vendorservice.addCar(carData).subscribe({
        next:((res:any) =>{
          alert("Car Added!");
          this.addCarForm.reset();
        })
      })
    }
    this.vendorservice.getCarsByVendor(this.vid).subscribe(
      (res:any)=>{
        this.cars=res;
      }
    );
    window.location.reload();
  }
}
