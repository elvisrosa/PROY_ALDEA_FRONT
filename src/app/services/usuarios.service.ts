import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { UsuarioModel } from 'app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = environment.URL;
  constructor(private http: HttpClient) { }

  traerUsuarios() {
    return this.http.get<UsuarioModel>(`${this.url}/user/todo`);
  }

  crearUsuario(usuario: UsuarioModel) {
    return this.http.post<UsuarioModel>(`${this.url}/user/crear`, usuario);
  }
}
