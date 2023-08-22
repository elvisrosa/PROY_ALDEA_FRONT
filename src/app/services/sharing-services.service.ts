import { Injectable } from '@angular/core';
import { Casa } from 'app/models/casa.modelo';
import { NinoEntity } from 'app/models/niño.modelo';
import { UsuarioModel } from 'app/models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingServicesService {
  
  private sharingData:BehaviorSubject<UsuarioModel | any> = new BehaviorSubject<UsuarioModel | any>(null);
  private sharingDataNiñosList:BehaviorSubject<NinoEntity[]> = new BehaviorSubject<NinoEntity[]>(null);
  private sharingCasa:BehaviorSubject<Casa[] | any> = new BehaviorSubject<Casa[] | any>(null);

  set setDataSharing(data:UsuarioModel){
    this.sharingData.next(data);
  }

  get getDataSharing(){
    return this.sharingData.asObservable();
  }

  set setDataListNiños(data:NinoEntity[]){
    console.log(data)
    this.sharingDataNiñosList.next(data);
  }

  get getDataListNiños(){
    return this.sharingDataNiñosList.asObservable();
  }

  set setCasaSharing(datac:Casa[]){
    this.sharingCasa.next(datac);
  }

  get getCasaSharing(){
    return this.sharingCasa.asObservable();
  }

}
