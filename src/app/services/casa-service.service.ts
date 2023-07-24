import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasaServiceService {
  url:string = environment.URL;
  
  constructor(private http:HttpClient) { }

  obetenerCasas(){
    return this.http.get(`${this.url}/casa/listar`);
  }

}
