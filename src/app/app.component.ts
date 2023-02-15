import { Component } from '@angular/core';
import jwt_decode from "jwt-decode";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youagram_fe';
  username = '';

  constructor(private apiService: ApiService) {
    this.apiService.username.subscribe(val=>{
      this.username = val;
    });
  }

  logout(){
    this.username = '';
    this.apiService.logout();
  }
}
