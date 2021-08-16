import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Service/user.service';
import { User } from '../User';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user:User = new User();
  submitted = false;
  userForm: FormGroup;
  disable:boolean = true
  
  msg : string = "";
  
  constructor(private userService:UserService, private formBuilder: FormBuilder, private router:Router) { }



  ngOnInit() {
    this.userForm = this.formBuilder.group({
      title:['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required, Validators.minLength(8)],
      confirmPassword: ['',Validators.required, Validators.minLength(8)],
      email: ['',Validators.required],
      phoneNumber:['',Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      dob:['',Validators.required]
     
      
  }
  );
  this.disable = true;
}

// submitting the form reset nhi ho rha
onSubmit() {
  console.log("SUBMIT");
  if (this.userForm.invalid){
    return;
  }

  this.userService.createUser(this.userForm.value).subscribe((data:any) => {
    this.msg = data;
    console.log("here");
    
  });
  
  this.userForm.reset()
 this.router.navigateByUrl("userLogin")
}

public goBack()
{
  console.log("inside go back");
   this.router.navigate(['/userLogin']);
}


}

