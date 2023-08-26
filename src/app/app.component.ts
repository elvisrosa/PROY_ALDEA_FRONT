import { Component, OnInit } from '@angular/core';
import { ServiceTokenService } from './services/service-token.service';
import { AuthService } from './services/login.service';
import { SharingServicesService } from './services/sharing-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private token:ServiceTokenService, private sharingS: SharingServicesService){}
  
  ngOnInit(): void {
    this.sharingS.setDataSharing = this.token.getUsuario();
    //this.auth.user$.next(this.token.getUsuario());
  }

}
