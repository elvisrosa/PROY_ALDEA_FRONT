import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NinoEntity, dataNiñoService } from 'app/models/niño.modelo';
import { MensajesService } from 'app/services/mensajes.service';
import { NiñoService } from 'app/services/niño.service';
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




  getAllDataById(data:any){
      this.dataNiño.setNiño = data;
      this.router.navigateByUrl('/crear-niños');
  }

  
  
}