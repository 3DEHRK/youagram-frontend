import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private toastrService: ToastrService,
              private apiService: ApiService) {
  }

  register(registerForm: NgForm){
    const {username, password, passwordConfirm} = registerForm.value;
    if(password === passwordConfirm){
      this.apiService.createProfile(username, password);
    }else{
      this.toastrService.error("Passwords don't match");
      //registerForm.resetForm();
    }
  }
}
