import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ninos-crear',
  templateUrl: './ninos-crear.component.html',
  styleUrls: ['./ninos-crear.component.scss']
})
export class NinosCrearComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nombre: ['', [Validators.required, Validators.maxLength]],
    apellido: ['', [Validators.required, Validators.maxLength]],
    lugnac: ['', [Validators.required, Validators.maxLength]],
    numerico: ['', [Validators.required, Validators.pattern]],
    edad: ['', [Validators.required, Validators.pattern]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.firstFormGroup.get('correo').value);
  }

}



