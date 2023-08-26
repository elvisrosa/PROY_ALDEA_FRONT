import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Casa } from 'app/models/casa.modelo';
import { CasaServiceService } from 'app/services/casa-service.service';
import { MensajesService } from 'app/services/mensajes.service';
import { ENUN } from 'environments/environment.prod';

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.scss']
})
export class CasasComponent implements OnInit {

  casas: Casa[] = [];
  formCasa: FormGroup;
  casa: Casa = null;
  estado:string = '';
  constructor(private casasService: CasaServiceService, private router:Router, private _builder: FormBuilder, private msj: MensajesService) { }

  ngOnInit(): void {
    this.casasService.obetenerCasas().subscribe(
      {
        next: (resp: Casa[]) => {
          this.casas = [...resp]
        }
      }
    );
    this.initForm();

  }

  initForm(): void {
    this.formCasa = this._builder.group({
      nombreecasa: [this.casa?.nombrecasa || '', Validators.required],
      numerocasa: [this.casa?.numerocasa || '', Validators.required],
      estado: [this.estado || '', Validators.required],
      direccion: [this.casa?.direccion || '', Validators.required],
      img: [this.casa?.img || '', Validators.required]
    });
  }

  verInfo($event) {
    this.casa = { ...$event };
    this.casa.estado = $event.estado;
    this.estado = $event.estado.toString();
    this.initForm();
  }


  public createCasa() {
    const datos = this.traerDatosForm();
    if (this.formCasa.valid) {
      if (this.casa?.idCasa) {
        this.casasService.actualizarCasa(this.casa.idCasa, datos).subscribe(
          {
            next: (resp: Casa) => {
              if (resp || resp != undefined) {
                this.msj.mostrarMensaje('Casa', 'Actualizada con exito', 1500, ENUN.SUCCES);
                this.limpiar();
              } else {
                this.msj.mostrarMensaje('Casa', 'Error al actualizar', 1500, ENUN.ERROR);
              }
            },
            error: (error) => this.msj.mostrarMensaje('Casa', 'Error '.concat(error.message), 1500, ENUN.ERROR)
          }
        )
      } else {
        this.casasService.crearCasa(datos).subscribe(
          {
            next: (resp) => {
              if (resp !== null) {
                this.msj.mostrarMensaje('Casa', 'Creado con exito', 1500, ENUN.SUCCES);
                this.formCasa.reset();
                this.casas.push(resp);
              }
            }
            , error: (resp: any) => {
              this.msj.mostrarMensaje('Casa', 'Error al crear la casa'.concat(resp.error.message), 2500, ENUN.ERROR);
            }

          }
        )
      }
    } else {
      this.formCasa.markAllAsTouched();
    }
  }

  eliminarCasa() {
    const alert = window.confirm('¿Seguro deseas eliminar este registro? ');
    if (alert) {
      this.casasService.eliminarCasa(this.casa.idCasa).subscribe(
        {
          next: (resp: any) => {
            if (resp.status === 'succes') {
              this.msj.mostrarMensaje('Casa', resp.message, 3500, ENUN.SUCCES);
              this.formCasa.reset();
              this.router.navigateByUrl('/casas');
            } else {
              this.msj.mostrarMensaje('Casa', resp.message, 2500, ENUN.ERROR);
            }
          }, error: resp => this.msj.mostrarMensaje('Casa', resp.message, 2500, ENUN.ERROR)
        }
      )
    }
  }

  limpiar(){
    this.formCasa.reset();
  }

  private traerDatosForm(): Casa {
    const casa: Casa = {
      idCasa: this.casa?.idCasa,
      numerocasa: this.formCasa.get('numerocasa').value,
      estado: this.formCasa.get('estado').value,
      nombrecasa: this.formCasa.get('nombreecasa').value,
      direccion: this.formCasa.get('direccion').value,
      img: this.formCasa.get('img').value,
    };
    return casa;
  }




}
