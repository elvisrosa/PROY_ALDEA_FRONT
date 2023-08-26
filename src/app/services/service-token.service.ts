import { Injectable } from '@angular/core';
import { UsuarioModel } from 'app/models/usuario.model';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class ServiceTokenService {

  constructor() { }

  setToken(token:string){
    setCookie('token', token, {secure:true, expires:365, path:'/'});
  }

  getToken(){
    return getCookie('token');
  }

  removeToken(){
    removeCookie('token');
  }


  setUsuario(usuario:any){
    const userString = JSON.stringify(usuario);
    localStorage.setItem('usuario', userString);
  }
  removeUsuario(){
    localStorage.removeItem('usuario');
  }

  getUsuario(){
    const usuarioJson = localStorage.getItem('usuario');
    const usuario:UsuarioModel = JSON.parse(usuarioJson);
    return usuario;
  }
}
