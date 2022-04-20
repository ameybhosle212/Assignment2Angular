import { Component, OnInit } from '@angular/core';
import { Employee } from "../employee.model";
import { FormGroup, FormControl } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  language:String[] = []
  qualification:String[] = []
  experience:String[]=[]
  selectedLanguage : String[] = []
  cookies:[] = []
  constructor(private cookie:CookieService , private route:Router) { }

  DD = new FormGroup({
    fname : new FormControl(''),
    lname : new FormControl(''),
    email : new FormControl(''),
    address : new FormControl(''),
    phone : new FormControl(''),
    uname : new FormControl(''),
    password : new FormControl(''),
    gender: new FormControl(''),
    qual: new FormControl(''),
    exp : new FormControl(''),
    lang : new FormControl()
  })

  ngOnInit(): void {
    this.language = ['C','C++','Java',"Python"]
    this.qualification = ['BE','BTECH','BCA','BCCA','MCA']
    this.experience = ['0','1','2','3','4','5+']
  }
  Submit(){
    console.log(this.DD.value);
    let pval = this.cookie.get("data");
    
    if(pval === ''){
      let emp:Employee = new Employee(1  ,this.DD.value.fname ,
        this.DD.value.lname,this.DD.value.email, this.DD.value.phone , this.DD.value.address  , this.DD.value.uname , this.DD.value.password  ,
        this.DD.value.gender , this.DD.value.qual ,this.selectedLanguage ,this.DD.value.exp
      )
      this.cookie.set("data",JSON.stringify([emp]))
    }
    else{
      let vv = JSON.parse(this.cookie.get("data"))
      let emp:Employee = new Employee(vv.length + 1  ,this.DD.value.fname ,
        this.DD.value.lname,this.DD.value.email, this.DD.value.phone , this.DD.value.address  , this.DD.value.uname , this.DD.value.password  ,
        this.DD.value.gender,this.DD.value.qual , this.selectedLanguage ,this.DD.value.exp
      )
      console.log(vv);
      this.cookie.set("data",JSON.stringify([...vv , emp]))
      console.log(JSON.parse(this.cookie.get("data")));
    }
    console.log(this.DD.value);
    this.DD.reset();
    this.route.navigate(['/'])
  }
  onCheck(e:any){
    if(e.target.checked){
      this.selectedLanguage.push(e.target.value)
      console.log("THE CHECKED VALUE IS " , e.target.value);
      console.log("THE CHECKED VALUE ARRAY " , this.selectedLanguage);
      console.log("THE CHECKED VALUE ARRAY " , this.DD.value.lang);
    }else{
      let index = this.selectedLanguage.findIndex(value => value === e.target.value)
      this.selectedLanguage.splice(index , 1);
      console.log("UNCHECKED VALUE IS ", e.target.value);
      console.log(this.selectedLanguage);
    }
  }
}
