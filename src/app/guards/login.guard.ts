import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceTokenService } from '../services/service-token.service';
import { AuthService } from 'app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private token: ServiceTokenService, private auth: AuthService,
    private router:Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
