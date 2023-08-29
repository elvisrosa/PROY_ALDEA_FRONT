import { Component, OnInit } from '@angular/core';
import { ServiceTokenService } from './services/service-token.service';
import { AuthService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  constructor(private token:ServiceTokenService, private auth:AuthService){}
  ngOnInit(): void {
    this.auth.user$.next(this.token.getUsuario());
  }

}
