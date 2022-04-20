export class Employee{
    id:Number= 1
    First_Name:String = ''
    Last_Name:String = ''
    Email:String = ''
    Phone_No:String = ''
    Address:String = ''
    uname:String = ''
    password:String = ''
    gender:String = ''
    Qualification:String = ''
    Coding_Lang:String[] = []
    Experience:String = ''
    constructor(
        id:Number,
        fname:String,
        lname:String,
        email:String,
        phone:String,
        address:String,
        un:String,
        pass:String,
        gen:String,
        qual:String,
        cod:String[],
        exp:String
        )
        {
        this.id = id,
        this.First_Name = fname,
        this.Last_Name = lname,
        this.Email = email,
        this.Phone_No = phone,
        this.Address = address,
        this.uname = un,
        this.password = pass,
        this.gender = gen,
        this.Qualification = qual,
        this.Coding_Lang = cod,
        this.Experience = exp
    }
}