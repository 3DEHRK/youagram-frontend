import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService) {
  }

  login(loginForm: NgForm){
    const {username, password} = loginForm.value;
    this.apiService.login(username, password);
    loginForm.resetForm();
  }
}
