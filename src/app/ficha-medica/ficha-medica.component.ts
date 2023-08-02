import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.component.html',
  styleUrls: ['./ficha-medica.component.scss']
})
export class FichaMedicaComponent implements OnInit {
  
  firstFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength]],
    apellido: ['', [Validators.required, Validators.maxLength]],
    edad: ['', [Validators.required, Validators.pattern]],
    peso: ['', [Validators.required, Validators.pattern]],
    talla: ['', [Validators.required, Validators.pattern]],
    medico: ['', [Validators.required, Validators.maxLength]],
    diagnostico: ['', [Validators.required, Validators.maxLength]],
    tratamiento: ['', [Validators.required, Validators.maxLength]],
    medicamentos: ['', [Validators.required, Validators.maxLength]],
    

    
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
