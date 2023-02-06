import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient
  ) {
  }

  API_URL = 'http://localhost:3000';

  getProfiles(){
    return this.http.get(this.API_URL+'/profiles');
  }

  createProfile(username: string, password: string){
    return this.http.put(this.API_URL+'/auth/register', {username, password}).subscribe();
  }

  getProfileByName(username: string){
    return this.http.get(this.API_URL+'/profiles/'+username);
  }
}
