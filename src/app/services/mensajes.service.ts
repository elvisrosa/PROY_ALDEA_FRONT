import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mostrarMensaje(titulo:string, mensaje:string, timer?:number){
    Swal.fire({
      title:titulo,
      icon:'error',
      showLoaderOnConfirm: true,
      text:mensaje,
      timer:timer     
    })
  }
}
