import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})

export class UpgradeComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios:any[]=[];
  persons=[
    {
      id:1,
      firstName:'Elvis',
      lastName:'Rosa'
    },
    {
      id:2,
      firstName:'Vera',
      lastName:'Rosa'
    },
    {
      id:3,
      firstName:'Carlos',
      lastName:'Rosa'
    }
  ]


  constructor(private usuarioService:UsuariosService) { }

  ngOnInit() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    // this.dtTrigger.next('');
    this.usuarioService.traerUsuarios().subscribe(
      {
        next: (resp:any)=>{
          this.usuarios = [...resp]
          console.log(resp)
        }
      }
    )


  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
