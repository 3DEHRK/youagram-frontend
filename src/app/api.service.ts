import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';
  private username$ = new BehaviorSubject<string>('');
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');

    if(fetchedToken){
      this.token = window.atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }

    this.jwtToken$.subscribe(value => {
        //@ts-ignore
        this.username$.next(jwt_decode(value).username);
      }
    )
  }

  get username(){
    return this.username$.asObservable();
  }

  get jwtToken(){
    return this.jwtToken$.asObservable();
  }

  updateProfile(profile: any){
    return this.http.put(this.API_URL+'/profiles',{profile}, {
      headers:{
        Bearer: this.token
      }
    }).subscribe(res=>{
      this.toastr.success(res.toString());
    },(err: HttpErrorResponse)=> {
        if (err.status == 406)
          this.toastr.error(err.error.message);
      });
  }

  addLink(url: string, title: string) {
    return this.http.post(this.API_URL+'/content/link', {url, title}, {
      headers:{
        Bearer: this.token
      }
    }).subscribe();
  }

  getLinks(username: string){
    return this.http.get(this.API_URL+'/content/link/'+username);
  }

  deleteLink(id: number) {
    return this.http.delete(this.API_URL+'/content/link/'+id, {
      headers:{
        Bearer: this.token
      }
    }).subscribe();
  }

  //TODO: auto-send bearer token

  getProfiles(){
    return this.http.get(this.API_URL+'/profiles');
  }

  createProfile(username: string, password: string){
    return this.http.post(this.API_URL+'/auth/register', {username, password}).subscribe(res=>{
      this.jwtLogin(res);
    }, (err: HttpErrorResponse)=>{
      if(err.status == 406)
        this.toastr.error(err.error.message);
      if(err.status == 409)
        this.toastr.warning(err.error.message);
    });
  }

  getProfileByName(username: string){
    return this.http.get(this.API_URL+'/profiles/'+username);
  }

  login(username: string, password: string){
    return this.http.post(this.API_URL+'/auth/login', {username, password})
      .subscribe(res=>{
        this.jwtLogin(res);
      }, (err: HttpErrorResponse)=>{
        if(err.status == 401)
          this.toastr.error(err.error.message);
      });
  }

  jwtLogin(res: any){
    //@ts-ignore
    this.token = res.token;

    if(this.token){
      this.jwtToken$.next(this.token);
      localStorage.setItem('act', window.btoa(this.token))
      this.router.navigateByUrl('/');
    }
  }

  logout(){
    localStorage.removeItem('act');
    this.token = '';
    this.username$.next('');
    this.jwtToken$.next(this.token);
    //this.router.navigateByUrl('/login');
  }
}
