import { Component, OnInit } from '@angular/core';
import { ServiceTokenService } from './services/service-token.service';
import { AuthService } from './services/login.service';
import { SharingServicesService } from './services/sharing-services.service';
import { CasaServiceService } from './services/casa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private id: number | null;
  private id_tutora: number | null;

  constructor(private token: ServiceTokenService, private sharingS: SharingServicesService,
    private casaService: CasaServiceService) { }

  ngOnInit(): void {
    this.sharingS.setDataSharing = this.token.getUsuario();
    //this.auth.user$.next(this.token.getUsuario());
    this.sharingS.getDataSharing.subscribe(resp => {
      if (resp?.tutor != null) {
        this.id_tutora = resp.tutor?.idTutora;
      }
    });
    if (this.id_tutora) {
      this.iniciarCasasTutor();
    }
  }


  iniciarCasasTutor() {
    this.sharingS.getDataSharing.subscribe({
      next: resp => {
        this.id = resp['tutor'].idTutora;
      }
    })

    this.casaService.obtenerCasaPorTutor(this.id).subscribe(
      {
        next: (resp: any) => {
          //this.casas = resp.filter(casa => casa.estado === 1);
          this.sharingS.setCasaSharing = resp.filter(casa => casa.estado === 1);
          //this.casas = [...resp];
        }
      }
    )
  }

}
