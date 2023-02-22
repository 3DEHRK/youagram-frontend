import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private apiService: ApiService
  ) {

  }

  profilePreviews: any[] = [];
  allProfilePreviews: any[] = [];

  ngOnInit(){
    this.apiService.getProfiles().subscribe((value)=>{
      this.allProfilePreviews = Object.values(value);
      this.profilePreviews = this.allProfilePreviews;
    });
  }

  updateFilter(searchForm: NgForm){
    let search = searchForm.value.searchText.toLowerCase();
    this.profilePreviews = this.allProfilePreviews
      .filter(i => i.username.toLowerCase().includes(search));
  }
}
