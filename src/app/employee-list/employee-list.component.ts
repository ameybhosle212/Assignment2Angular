import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  value:[]=[]
  closeResult:String = '';
  constructor(private cookie:CookieService, private modalService: NgbModal) { 
    if(this.cookie.get("data") != ''){
      this.value = JSON.parse(this.cookie.get("data"))
      console.log(this.value);
    }
  }

  ngOnInit(): void {
  }
  delete(id:any){
    let ii = parseInt(id);
    let p = this.value.findIndex((datatata) => datatata['id'] === ii)
    console.log(p);
    this.value.splice(p , 1);
    this.cookie.set("data",JSON.stringify(this.value))
    console.log(this.cookie.get("data"));
  }
  open(content:any,id:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.delete(id);
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
         console.log(this.closeResult);
         
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

