import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NinoEntity, dataNiñoService } from 'app/models/niño.modelo';
import { NiñoService } from 'app/services/niño.service';
import { SharingServicesService } from 'app/services/sharing-services.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { Role } from '../models/usuario.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy {


  @ViewChild('datatablechild') dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  public dtOptions: any = {};
  public ninos: NinoEntity[] = [];
  public dtTrigger: Subject<any> = new Subject<any>();


  constructor(private router: Router,
    private niñoS: NiñoService,
    private dataNiño: dataNiñoService,
    private sharingService: SharingServicesService) { }


  public rol: String[] = [];
  ngOnInit(): void {
    this.sharingService.getDataSharing.subscribe({
      next: resp=> this.rol = resp.roles
    })
    if(this.rol.includes('ADMIN') || this.rol.includes('ADMIN') && this.rol!==undefined){
      this.getAll();
    }else{
      this.getAllByIdCasa();
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      search: true,
      responsive: true,
      retrieve:true,
      language: {
        url: './assets/languaje.json'
      },
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('Button activated');
          }
        }
      ]
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  getAll() {
    this.niñoS.getAll().subscribe(
      {
        next: (resp: any) => {
          this.ninos = [...resp];
          this.dtTrigger.next('');
        }
      }
    )
  }

  getAllByIdCasa(){
    this.sharingService.getDataListNiños.subscribe(
      {
        next: (resp: any[]) => {
          console.log(resp)
          this.ninos = [...resp];
          this.dtTrigger.next('');
        }
      }
    )
  } 




  getAllDataById(data: any) {
    this.dataNiño.setNiño = data;
    this.router.navigateByUrl('/crear-niños');
  }



}