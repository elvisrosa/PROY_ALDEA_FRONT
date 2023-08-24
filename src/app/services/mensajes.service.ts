import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mostrarMensaje(titulo:string, mensaje:string, timer?:number, icon?:any){
    Swal.fire({
      title:titulo,
      icon:icon,
      showLoaderOnConfirm: true,
      text:mensaje,
      timer:timer     
    })
  }
}
