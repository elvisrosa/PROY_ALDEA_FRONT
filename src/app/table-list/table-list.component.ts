import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NinoEntity, dataNiñoService } from 'app/models/niño.modelo';
import { MensajesService } from 'app/services/mensajes.service';
import { NiñoService } from 'app/services/niño.service';
import { url } from 'inspector';
import { get } from 'jquery';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy{


  @ViewChild('datatablechild') dtElement:DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any= {};
  ninos: NinoEntity[] = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private router: Router,
    private niñoS:NiñoService,
    private msj:MensajesService,
    private dataNiño:dataNiñoService) { }


  ngOnInit(): void {
    this.getAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      search:true,
      responsive:true,
      language: {
        url:'./assets/languaje.json'
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
    this.dtTrigger.unsubscribe();
  }

  getAll(){
    this.niñoS.getAll().subscribe(
      {
        next: (resp:any)=>{
          this.ninos= [...resp];
          this.dtTrigger.next('');
        }
      }
    )
  }

  deleteByCedula(cedula:string){
    const alert = window.confirm('¿Seguro deseas eliminar este registro? ');
    if(alert){
      this.niñoS.deleteByCedula(cedula).subscribe(
        {
          next:()=>{this.msj.mostrarMensaje('Mensaje del sistema', 'Registro eliminado con exito', 2000)}
        }
      )
    }else{
      console.log('cancelado')
    }
    
  }


  getAllDataById(data:any){
      this.dataNiño.setNiño = data;
      this.router.navigateByUrl('/crear-niños');
  }

  
  
}