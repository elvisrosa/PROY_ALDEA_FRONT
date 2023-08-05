import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NinoEntity } from 'app/models/niño.modelo';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NiñoService {

  url:string=environment.URL;

  constructor(private http:HttpClient) { }

  crearNino(niño:NinoEntity){
    return this.http.post<NinoEntity>(`${this.url}/niños/crear`, niño);
  }

  getAll(){
    return this.http.get<NinoEntity>(`${this.url}/niños`);
  }

  deleteByCedula(cedula:string){
    return this.http.delete(`${this.url}/eliminar/${cedula}`);
  }

}
