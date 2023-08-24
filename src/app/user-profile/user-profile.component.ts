import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Casa } from 'app/models/casa.modelo';
import { UsuarioModel, dataUsuarioService } from 'app/models/usuario.model';
import { CasaServiceService } from 'app/services/casa-service.service';
import { MensajesService } from 'app/services/mensajes.service';
import { UsuariosService } from 'app/services/usuarios.service';
import { CommonModule } from '@angular/common';

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
  hide = true;

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
      username: [this.usuario?.username, Validators.required],
      correo: [this.usuario.tutor?.correo || '', Validators.required],
      nombres: [this.usuario.tutor?.nombre || '', Validators.required],
      contraseña: [''],
      roles: [this.toppings || ''],
      //roles: this.rolesFormControl, // Asigna el FormControl creado a 'roles'
      apellidos: [this.usuario.tutor?.apellido || ''],
      cedula: [this.usuario.tutor?.cedula || ''],
      telefono: [this.usuario.tutor?.telefono || ''],
      bloqueado: [this.usuario?.locked || '', Validators.required],
      habilitado: [this.usuario?.disabled || '', Validators.required],
      casaControl: [''],
    });
    if (this.usuario.username) {
      this.form.get('username').disable();
    }
  }


  public crearUsuario() {
    console.log('Traer datos', this.traerDatos())
    if (this.form.valid) {

      this.usarioService.crearUsuario(this.traerDatos()).subscribe(
        {
          next: (resp) => {
            console.log('resp crear', resp)
            if (resp != null) {
              console.log('resp id-tutora', resp.tutor.idTutora)
              this.id_tutor_creado = resp.tutor.idTutora;
              this.cedula_tutora = resp.tutor.cedula;
              this.nombre_tutora = resp.tutor.nombre;
              this.msjS.mostrarMensaje('Usuario', 'Usuario creado con exito', 2000);
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
    } else {
      this.msjS.mostrarMensaje('Usuario', 'Formulario invalido', 2000)
    }
  }

  public eliminarUsuario() {
    this.usarioService.eliminarUaurio(this.usuario.username).subscribe(
      {
        next: (resp: any) => {
          this.msjS.mostrarMensaje('Usuario', resp.message, 1500, 'succes');
          this.limpiarForm();
          this.router.navigateByUrl('/permiso-tutores');
        },
        error: () => console.log('Error al elimianr')
      }

    )
  }

  private traerDatos(): UsuarioModel {
    const datosUsuario: UsuarioModel = {
      username: this.form.get('username').value,
      correo: this.form.get('correo').value,
      password: this.form.get('contraseña').value,
      nombres: this.form.get('nombres').value,
      apellidos: this.form.get('apellidos').value,
      disabled: false,
      locked: false,
      tutor: {
        idTutora: this.usuario?.tutor?.idTutora,
        apellido: this.form.get('apellidos').value,
        telefono: this.form.get('telefono').value,
        cedula: this.form.get('cedula').value,
        nombre: this.form.get('nombres').value,
        correo: this.form.get('correo').value
      },
      roles: this.toppings.value.map((role: string) => ({ role }))
      //roles: this.form.get('roles').value.map((role: string) => ({ role }))
    }
    if(this.form.get('contraseña').value.trim() === ''){
      datosUsuario.password = undefined;
    }
    return datosUsuario;
  }

  private limpiarForm(): void {
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
        next: (resp) => { 
          this.msjS.mostrarMensaje('Mensaje del sistema', 'Se agrego el usuario a la casa seleccioanda', 2000);
           this.form.get('casaControl').reset(); 
           this.router.navigateByUrl('/permiso-tutores') },
        error: (error) => this.msjS.mostrarMensaje('Mensaje del sistema', 'Ocurrio al asignarle una casa: '.concat(error), 2000)
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
