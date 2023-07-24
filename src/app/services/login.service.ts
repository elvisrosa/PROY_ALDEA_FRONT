import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = environment.URL;
  constructor(private http:HttpClient) { }

  iniciarSesion(username:string, password:string){
    return this.http.post(`${this.url}/auth/login`, {username, password});
  }


}
