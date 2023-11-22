import { CompanyService } from 'src/app/services/company.service';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule]
})
export class AdminComponent implements OnInit {
  constructor(private vendorservice: VendorService, private companyservice: CompanyService, private router: Router, private route: ActivatedRoute) {
  }

  aid = this.route.snapshot.paramMap.get('id')!;
  name: string = "noreturn";
  companiesApproved?: any[];
  vendorsApproved?: any[];
  companiesPendingApproval?: any[];
  vendorsPendingApproval?: any[];
  companiesWithoutVendor?: any[];
  vendorsWithoutCompany?: any[];
  displayedColumns: string[] = ['name', 'email', 'address', 'action'];
  mapdisplayedColumns: string[] = ['name', 'email', 'address', 'vendor', 'action'];
  displayedColumnsApproved: string[] = ['name', 'email', 'address'];
  ngOnInit(): void {
    this.companyservice.getCompaniesApproved().subscribe(
      (res: any) => {
        this.companiesApproved = res;
        this.companiesApproved?.forEach((company) => {
          if (company.vendorId != "") {
            this.vendorservice.getVendorDetails(company.vendorId).subscribe(
              (res: any) => {
                company.vendorName = res.name;
                console.log(res.name);
              }
            );
          }
        })
      }
    );

    this.vendorservice.getVendorsApproved().subscribe(
      (res: any) => {
        this.vendorsApproved = res;
      }
    );

    this.companyservice.getCompaniesPendingApproval().subscribe(
      (res: any) => {
        this.companiesPendingApproval = res;
      }
    );
    this.companyservice.getCompaniesWithoutVendor().subscribe(
      (res: any) => {
        this.companiesWithoutVendor = res;
      }
    );
    this.vendorservice.getVendorsPendingApproval().subscribe(
      (res: any) => {
        this.vendorsPendingApproval = res;
      }
    );
    this.vendorservice.getVendorsWithoutCompany().subscribe(
      (res: any) => {
        this.vendorsWithoutCompany = res;
      }
    );
  }

  vendorAssigned(event: any, cid: string) {
    let vid = event.target.value;
    this.vendorservice.getVendorDetails(vid).subscribe(
      (res: any) => {
        res.companyId = cid;
        this.vendorservice.updateApproval(vid, res).subscribe(
          (resres: any) => {
          }
        );
      }
    );
    this.companyservice.getCompanyDetails(cid).subscribe(
      (res: any) => {
        res.vendorId = vid;
        this.companyservice.updateApproval(cid, res).subscribe(
          (resres: any) => {
          }
        );
      }
    );
    window.location.reload();
  }

  vendorChanged(event: any, cid: string) {
    let newvid = event.target.value;
    this.companyservice.getCompanyDetails(cid).subscribe(
      (res: any) => {
        let oldvid=res.vendorId;
        this.vendorservice.getVendorDetails(oldvid).subscribe(
          (pres: any) => {
            pres.companyId = "";
            this.vendorservice.updateApproval(oldvid, pres).subscribe(
              (resres: any) => {
              }
            );
          }
        );
        res.vendorId = newvid;
        this.companyservice.updateApproval(cid, res).subscribe(
          (resres: any) => {
          }
        );
      }
    );
    this.vendorservice.getVendorDetails(newvid).subscribe(
      (res: any) => {
        res.companyId = cid;
        this.vendorservice.updateApproval(newvid, res).subscribe(
          (resres: any) => {
          }
        );
      }
    );
    window.location.reload();
  }

  onApproveCompany(cid: string) {
    let comp: any;
    this.companyservice.getCompanyDetails(cid).subscribe(
      (res: any) => {
        res.approvalStatus = true;
        this.companyservice.updateApproval(cid, res).subscribe(
          (resres: any) => {
            alert("approval successfull!");
          }
        );
      }
    );
    window.location.reload();
  }
  onApproveVendor(vid: string) {
    let comp: any;
    this.vendorservice.getVendorDetails(vid).subscribe(
      (res: any) => {
        res.approvalStatus = true;
        this.vendorservice.updateApproval(vid, res).subscribe(
          (resres: any) => {
            alert("approval successfull!");
            this.ngOnInit;
          }
        );
      }
    );
    window.location.reload();
  }


}
