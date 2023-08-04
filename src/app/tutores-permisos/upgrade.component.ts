import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioModel, dataUsuarioService} from 'app/models/usuario.model';
import { UsuariosService } from 'app/services/usuarios.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})

export class UpgradeComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: UsuarioModel[] = [];
  constructor(private usuarioService: UsuariosService,
    private dataUsuarioService:dataUsuarioService
  ) { }

  //    private dataUsuario:dataUsuarioService

  ngOnInit() {
    this.usuarioService.traerUsuarios().subscribe(
      {
        next: (resp: any) => {
          this.usuarios = [...resp]
          console.log(resp)
        }
      }
    )
  }

  enviarDatosUusario(usuario: UsuarioModel) {
    this.dataUsuarioService.enviarUsuario = usuario;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
