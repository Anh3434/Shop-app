import { Component, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  dateOfBirth: Date;
  
  constructor(private router: Router, private userService : UserService) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.dateOfBirth=new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  register() {

    const registerDTO : RegisterDTO = {         
      "fullname": this.fullName,
      "phone": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1 
    }

    this.userService.register(registerDTO)
      .subscribe ({
        next: (response: any) => {
          debugger
          this.router.navigate(['/login']);          
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {          
          alert(`Cannot register, error: ${error.error}`)          
        } 
      });
  }


  onPhoneChange() {
    console.log(this.phone)
  }

  checkPasswordMatch() {
    if (this.password != this.retypePassword) {
      this.registerForm.controls['retypePassword'].setErrors({'passwordMissMatch': true})
    }
    else {
      this.registerForm.controls['retypePassword'].setErrors(null)
    }
  }
}
