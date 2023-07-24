import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'app/services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['ng-matero', [Validators.required]],
    password: ['ng-matero', [Validators.required]],
    rememberMe: [false],
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }
  username: string = '';
  password: string = '';
  login() {
    this.router.navigateByUrl('/principal');
    this.isSubmitting = true;
    this.authService.iniciarSesion(this.username, this.password).subscribe(
      {
        next: (resp: any) => {
          console.log(resp);
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

}
