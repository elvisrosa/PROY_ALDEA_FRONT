import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuarioModel } from 'app/models/usuario.model';
import { MensajesService } from 'app/services/mensajes.service';
import { UsuariosService } from 'app/services/usuarios.service';
import { event } from 'jquery';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  constructor(private _build: FormBuilder,
    private usarioService: UsuariosService,
    private msjS: MensajesService) { }
  form: FormGroup;
  toppingList: string[] = ['TUTOR', 'ADMINT', 'ADMIN'];

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this._build.group({
      username: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      nombres: ['', Validators.required],
      contraseña: ['', Validators.required],
      roles: [[''], Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }


  crearUsuario() {
    this.usarioService.crearUsuario(this.traerDatos()).subscribe(
      {
        next: (resp) => {
          if (resp != null) {
            this.msjS.mostrarMensaje('Usuario', 'Usuario creado cone exito', 2000);
            this.form.reset();
          }else{
            this.msjS.mostrarMensaje('Usuario', 'Usuario no creado', 2000);
          }

        },
        error: (error) => this.msjS.mostrarMensaje('Usuario', 'Error al crear el usuario '.concat(error), 2000)
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
      roles: this.form.get('roles').value.map((role: string) => ({ role }))
    }
    return datosUsuario;
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
