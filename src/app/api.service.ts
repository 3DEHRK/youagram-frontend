import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';
  public username = ''; //TODO: fix this bs (async)
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router
  ) {
    const fetchedToken = localStorage.getItem('act');

    if(fetchedToken){
      this.token = window.atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }

    this.jwtToken.subscribe(value => {
        //@ts-ignore
        this.username = jwt_decode(value).username;
      }
    )
  }

  get jwtToken(){
    return this.jwtToken$.asObservable();
  }

  getProfiles(){
    return this.http.get(this.API_URL+'/profiles');
  }

  createProfile(username: string, password: string){
    return this.http.put(this.API_URL+'/auth/register', {username, password}).subscribe();
  }

  getProfileByName(username: string){
    return this.http.get(this.API_URL+'/profiles/'+username);
  }

  login(username: string, password: string){
    return this.http.post(this.API_URL+'/auth/login', {username, password})
      .subscribe(res=>{

        //@ts-ignore
        this.token = res.token;

        if(this.token){
          this.jwtToken$.next(this.token);
          localStorage.setItem('act', window.btoa(this.token))
          this.router.navigateByUrl('/');
        }
      });
  }

  logout(){
    localStorage.removeItem('act');
    this.token = '';
    this.username = '';
    this.jwtToken$.next(this.token);
    this.router.navigateByUrl('/login');
  }
}
