import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Casa } from 'app/models/casa.modelo';

@Injectable({
  providedIn: 'root'
})
export class CasaServiceService {
  url:string = environment.URL;
  
  constructor(private http:HttpClient) { }

  obetenerCasas(){
    return this.http.get<Casa>(`${this.url}/casa/listar`);
  }

  obtenerCasaPorTutor(id:number){
    return this.http.get(`${this.url}/tutor/listarcasas/${id}`);
  }

}
