import { Component, OnInit } from '@angular/core';
import { SharingServicesService } from 'app/services/sharing-services.service';
import { NinoEntity } from '../../models/niño.modelo';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss']
})
export class ParticipantsTableComponent implements OnInit {

  constructor(private sharingS: SharingServicesService
    ) { }

    ninos: NinoEntity[] = [];

  ngOnInit(): void {
      this.sharingS.getDataListNiños.subscribe(
        {
          next:(resp)=>{
            this.ninos = resp;
          }
        }
      )
  }

}
