import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'app/services/mensajes.service';
import { ServiceTokenService } from 'app/services/service-token.service';
import { Token } from '@angular/compiler';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isSubmitting = false;  

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private mensaje:MensajesService,
    private token:ServiceTokenService
    ) { }
  ngOnInit(): void {
    const usuario = this.authService.user$;
    const token = this.token.getToken();
    if(usuario && token){
      this.router.navigateByUrl('/principal');           
    }
  }

  login() { 
    this.isSubmitting = true;
    if(this.loginForm.get('username').value != '' || this.loginForm.get('password').value != ''){
      this.authService.iniciarSesion(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
        {
          next: (resp: any) => {
            if (resp && resp.estado === false) {
              this.mensaje.mostrarMensaje('Ups', resp.mensaje, 2500);       
            } else{    
              this.router.navigateByUrl('/principal');           
            }
          },
          error: ()=> this.mensaje.mostrarMensaje('Ups', 'Comunicate con soporte', 1000)
        }
      )
    }else{
      this.mensaje.mostrarMensaje('Mensaje del sistema', 'Campos vacios', 1500);     
    }
  }

}
