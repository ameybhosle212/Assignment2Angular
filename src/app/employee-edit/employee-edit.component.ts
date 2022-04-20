import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  ids:any = 0
  language:String[] = []
  qualification:String[] = []
  experience:String[]=[]
  arr:any[] = []
  value:Employee = new Employee(0,' ',' ',' ',' ',' ',' ',' ',' ','',[],'')
  selectedLanguage: any[] = [];
  constructor(private activatedRoute: ActivatedRoute , private cookie:CookieService,
    private route:Router ) {
    this.activatedRoute.params.subscribe(params => {
          this.ids = parseInt(params['id']); // Print the parameter to the console. 
      });
      this.arr = JSON.parse(this.cookie.get("data"))
      console.log(this.arr , this.ids);
      let p = this.arr.findIndex(data => data.id === this.ids)
      this.value = this.arr[p];
      console.log("THE VALUE IS " , this.value);
  }
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
    // lang : new FormControl([])
  })
  ngOnInit(): void {
    this.language = ['C','C++','Java',"Python"]
    this.qualification = ['BE','BTECH','BCA','BCCA','MCA']
    this.experience = ['0','1','2','3','4','5+']
    this.DD.setValue({
      fname:this.value.First_Name,
      lname:this.value.Last_Name,
      email :this.value.Email,
      address :this.value.Address,
      phone :this.value.Phone_No,
      uname :this.value.uname,
      password :this.value.password,
      gender: this.value.gender,
      qual: this.value.Qualification,
      exp : this.value.Experience,
      // lang: this.value.Coding_Lang
    })
  }
  Submit(){
    this.value.First_Name = this.DD.value.fname 
    this.value.Last_Name = this.DD.value.lname 
    this.value.Email = this.DD.value.email 
    this.value.Address = this.DD.value.address 
    this.value.Phone_No = this.DD.value.phone 
    this.value.uname = this.DD.value.uname 
    this.value.password = this.DD.value.password
    this.value.gender = this.DD.value.gender
    this.value.Qualification = this.DD.value.qual
    this.value.Experience = this.DD.value.exp
    // this.value.Coding_Lang = this.selectedLanguage
    console.log(this.arr);
    this.cookie.set("data",JSON.stringify(this.arr))
    console.log(JSON.parse(this.cookie.get("data")));
    this.route.navigate(['/'])
  }
  onCheck(e:any){
    if(e.target.checked){
      this.selectedLanguage.push(e.target.value)
      console.log("THE CHECKED VALUE IS " , e.target.value);
      console.log("THE CHECKED VALUE ARRAY " , this.selectedLanguage);
    }else{
      let index = this.selectedLanguage.findIndex(value => value === e.target.value)
      this.selectedLanguage.splice(index , 1);
      console.log("UNCHECKED VALUE IS ", e.target.value);
      console.log(this.selectedLanguage);
    }
  }
}
