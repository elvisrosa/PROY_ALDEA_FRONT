import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Casa } from 'app/models/casa.modelo';
import { CasaServiceService } from 'app/services/casa-service.service';
import { MensajesService } from 'app/services/mensajes.service';

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.scss']
})
export class CasasComponent implements OnInit {

  casas: Casa[] = [];
  formCasa: FormGroup;
  casa:Casa=null;
  constructor(private casasService: CasaServiceService, private _builder: FormBuilder, private msj: MensajesService) { }

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
      numerocasa: [this.casa?.numerocasa||'', Validators.required],
      estado: [this.casa?.estado ||'', Validators.required],
      direccion: [this.casa?.direccion||'', Validators.required],
      img: [this.casa?.img||'', Validators.required]
    });
  }
  
  verInfo($event){
    this.casa = { ...$event};
    this.casa.estado = $event.estado;
    this.initForm();
  }


  public createCasa() {
    const datos = this.traerDatosForm();
    if (this.formCasa.valid) {
      if(this.casa?.idCasa){
        console.log(this.casa.idCasa, datos)
        this.casasService.actualizarCasa(this.casa.idCasa, datos).subscribe(
          {
            next: (resp:Casa)=>{
              if(resp || resp!=undefined){
                  this.msj.mostrarMensaje('Casa', 'Actualizada con exito', 1500);
                  //this.casas.push(resp);
                }else{
                  this.msj.mostrarMensaje('Casa', 'Error al actualizar', 1500);
                }
              },
              error: (error)=> this.msj.mostrarMensaje('Casa', 'Error '.concat(error.message), 1500)
            }
          )
      }else{
      this.casasService.crearCasa(datos).subscribe(
        {
          next: (resp) => {
            if (resp !== null) {
              this.msj.mostrarMensaje('Casa', 'Creado con exito', 1500);
              this.formCasa.reset();
              this.casas.push(resp);
            }
          }
          , error: (error) => {
            this.msj.mostrarMensaje('Casa', 'Error al crear la casa'.concat(error), 2500);
          }

        }
      )}
    } else {
      this.formCasa.markAllAsTouched();
    }
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
