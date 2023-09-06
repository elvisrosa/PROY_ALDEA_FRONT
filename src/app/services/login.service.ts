import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { tap } from 'rxjs';
import { ServiceTokenService } from './service-token.service';
import { Router } from '@angular/router';
import { SharingServicesService } from './sharing-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user$ = new BehaviorSubject<UsuarioModel | null>(null);
  private isLogin:boolean=false;

  url: string = environment.URL;
  constructor(private http: HttpClient,
    private token: ServiceTokenService,
    private router:Router,
    private sharingS: SharingServicesService) { }


  iniciarSesion(username: string, password: string) {
    return this.http.post(`${this.url}/auth/login`, { username, password }).pipe(
      tap((resp: any) => {
        if(resp.estado===true){
          this.isLogin=true;
          this.sharingS.setDataSharing = resp.usuario;
          this.token.setToken(resp.token);
          this.token.setUsuario(resp.usuario);
        }
      })
    );
  }

  cerrarSesion(){
    this.token.removeToken();
    this.token.removeUsuario();
    this.router.navigateByUrl('');
    this.isLogin=false;
  }

  get getLogin():boolean{
    return this.isLogin;
  }

  set setLogin(valor:boolean){
    this.isLogin=valor;
  }


}
