import { Component } from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  username: string = '';
  exampleDataPw: string = '';

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.username = params['id'];
      this.apiService.getProfileByName(this.username).subscribe(res=>{
        //@ts-ignore
        this.exampleDataPw = res.password;
      });
    })
  }
}
