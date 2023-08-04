import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Casa } from 'app/models/casa.modelo';
import { UsuarioModel, dataUsuarioService } from 'app/models/usuario.model';
import { CasaServiceService } from 'app/services/casa-service.service';
import { MensajesService } from 'app/services/mensajes.service';
import { UsuariosService } from 'app/services/usuarios.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  public usuario: UsuarioModel = null;
  mostrarCrearEditar: boolean = true;
  id_tutor_creado: number = null;
  id_casa: number = null;
  cedula_tutora: string = null;
  nombre_tutora: string = null;
  constructor(private _build: FormBuilder,
    private usarioService: UsuariosService,
    private dataUs: dataUsuarioService,
    private msjS: MensajesService,
    private router: Router,
    private casaservice: CasaServiceService) {
  }

  toppings: FormControl = new FormControl([]);
  //casaControl:FormControl = new FormControl('', [Validators.required]);
  form: FormGroup;
  casas: Casa[] = [];
  toppingList: string[] = ['TUTOR', 'ADMINT', 'ADMIN'];

  ngOnInit() {
    this.traerCasas();
    this.usuario = this.dataUs.obtenerUsuario;

    if (this.usuario != null && this.usuario.roles) {
      const rolesArray = this._build.array(this.usuario.roles.map((role) => role.role));
      this.toppings = new FormControl(rolesArray.value)
    }
    this.initForm();
  }

  initForm(): void {
    this.form = this._build.group({
      username: [this.usuario.username, Validators.required],
      correo: [this.usuario.tutor?.correo || '', Validators.required],
      nombres: [this.usuario.tutor?.nombre || '', Validators.required],
      contraseña: [this.usuario.password, Validators.required],
      roles: [this.toppings || '', [Validators.required]],
      //roles: this.rolesFormControl, // Asigna el FormControl creado a 'roles'
      apellidos: [this.usuario.tutor?.apellido || '', Validators.required],
      cedula: [this.usuario.tutor?.cedula || '', Validators.required],
      telefono: [this.usuario.tutor?.telefono || '', Validators.required],
      bloqueado: [this.usuario.locked || '', Validators.required],
      habilitado: [this.usuario.disabled || '', Validators.required],
      casaControl: ['', Validators.required],
    });
  }


  crearUsuario() {
    if(this.form.valid){   
      this.usarioService.crearUsuario(this.traerDatos()).subscribe(
        {
          next: (resp) => {
            if (resp != null) {
              this.id_tutor_creado = resp.tutor.idTutora;
              this.cedula_tutora = resp.tutor.cedula;
              this.nombre_tutora = resp.tutor.nombre;
              this.msjS.mostrarMensaje('Usuario', 'Usuario creado cone exito', 2000);
              this.limpiarForm();
              this.mostrarCrearEditar = false;
              this.traerCasas();
            } else {
              this.msjS.mostrarMensaje('Usuario', 'Usuario no creado', 2000);
            }
  
          },
          error: (error) => this.msjS.mostrarMensaje('Usuario', 'Error al crear el usuario '.concat(error), 2000)
        }
      )
    }else{
      this.msjS.mostrarMensaje('Usuario', 'Formulario invalido', 2000)
    }
  }

  eliminarUsuario() {
    this.usarioService.eliminarUaurio(this.usuario.username).subscribe(
      {
        next: () => {
          this.limpiarForm();
          //this.router.navigateByUrl('/permiso-tutores');
        },
        error: () => console.log('Error al elimianr')
      }

    )
  }

  traerDatos(): UsuarioModel {
    const datosUsuario: UsuarioModel = {
      username: this.form.get('username').value,
      correo: this.form.get('correo').value,
      password: this.form.get('contraseña').value,
      nombre: this.form.get('nombres').value,
      disabled: false,
      locked: false,
      tutor: {
        apellido: this.form.get('apellidos').value,
        telefono: this.form.get('telefono').value,
        cedula: this.form.get('cedula').value,
        nombre: this.form.get('nombres').value,
        correo: this.form.get('correo').value
      },
      roles: this.toppings.value.map((role: string) => ({ role }))
      //roles: this.form.get('roles').value.map((role: string) => ({ role }))
    }
    return datosUsuario;
  }

  limpiarForm(): void {
    this.form.reset();
    this.toppings.reset();
  }

  traerCasas() {
    this.casaservice.obetenerCasas().subscribe(
      {
        next: (resp: any) => {
          this.casas = [...resp];
        }
      }
    )
  }


  asignarTutorCasa() {
    let id_casa = this.form.get('casaControl')?.value;
    this.usarioService.asignarTutorAcasa(this.id_tutor_creado, id_casa).subscribe(
      {
        next: (resp) => {this.msjS.mostrarMensaje('Mensaje del sistema', 'Se agrego el usuario a la casa seleccioanda', 2000); this.form.get('casaControl').reset(); this.router.navigateByUrl('/perfil-usuario')},
        error:(error)=>this.msjS.mostrarMensaje('Mensaje del sistema', 'Ocurrio al asignarle una casa: '.concat(error), 2000)
      }
    )
  }
}


  // traerDatos(): UsuarioModel {
  //   // const datosUsaurio: UsuarioModel = {
  //   //   username: this.form.get('username').value,
  //   //   correo: this.form.get('correo').value,
  //   //   nombre: this.form.get('nombres').value,
  //   //   password: this.form.get('contraseña').value,
  //   //   roles: [
  //   //     {
  //   //       role: this.form.get('roles').value
  //   //     }
  //   //   ],
  //   //   tutor: {
  //   //     apellido: this.toppings.get('apellidos').value,
  //   //     telefono: this.toppings.get('telefono').value,
  //   //     cedula: this.toppings.get('cedula').value,
  //   //   },

  //   // }
  //   // return datosUsaurio;
  //   return null;
  // }
