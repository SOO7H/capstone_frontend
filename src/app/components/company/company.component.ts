import { CompanyService } from 'src/app/services/company.service';
import { Component,OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  standalone:true,
  imports: [MatTableModule,CommonModule]
})

export class CompanyComponent implements OnInit {
  constructor(private companyservice: CompanyService, private router: Router, private route: ActivatedRoute){
  }
  cid=this.route.snapshot.paramMap.get('id')!;
  company:any;
  employees?:any[];
  displayedColumns: string[] = ['name', 'email', 'address'];
  dataSource=this.employees!;
  ngOnInit(): void {

    this.companyservice.getCompanyDetails(this.cid).subscribe(
      (res:any)=>{


        this.company=res;
      }
    );
      

    this.companyservice.getEmployees(this.cid).subscribe(
      (res:any)=>{
        console.log(res);
        this.employees=res;
        console.log("res");

      }
    );
  }


}
