import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NiñoService } from 'app/services/niño.service';
import { NinoEntity, dataNiñoService } from 'app/models/niño.modelo';
import { MensajesService } from 'app/services/mensajes.service';
import { CasaServiceService } from 'app/services/casa-service.service';
import { Casa } from 'app/models/casa.modelo';


@Component({
  selector: 'app-ninos-crear',
  templateUrl: './ninos-crear.component.html',
  styleUrls: ['./ninos-crear.component.scss']
})

export class NinosCrearComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private niñoService: NiñoService,
    private mensajes: MensajesService,
    private casaService: CasaServiceService,
    private dataNiñoService?: dataNiñoService) { }


  casas: Casa[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlPadre: FormGroup;
  formControlMadre: FormGroup;
  casaForm: FormGroup;
  public niño:NinoEntity = this.dataNiñoService.getNiño;



  ngOnInit(): void {
    this.casaService.obetenerCasas().subscribe(
      {
        next: (resp: any) => {
          this.casas = [...resp];
          console.log('Metodo', this.casas)
        }
      }
      )
      this.initFor();
      this.getNiñoByCedula();

  }

  initFor() {
    this.firstFormGroup = this._formBuilder.group({
      cedula: [this.niño?.cedula || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: [this.niño?.nombres || '', [Validators.required]],
      apellido: [this.niño?.apellidos || '', [Validators.required]],
      fechaNacN: [this.niño?.fechaNacimiento || '', [Validators.required]],
      lugnac: [this.niño?.lugarNacimiento || '', [Validators.required]],
      edad: [this.niño?.edad || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sexo: [this.niño?.sexo, [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
      fechaPa: [this.niño?.bautizo.fecha || '', Validators.required],
      descripcionpadrino: [this.niño?.bautizo.descripcionPadrino||'', Validators.required],
      matromoniopadres: [this.niño?.bautizo.matrimoniosPadres||'', Validators.required]
    });

    this.casaForm = this._formBuilder.group({
      casaControl: [this.niño?.casa.idCasa || '', Validators.required]
    });

    this.formControlPadre = this._formBuilder.group({
      cedula: [this.niño?.padre.cedula || '', Validators.required],
      nombres: [this.niño?.padre.nombre || '', Validators.required],
      apellidos: [this.niño?.padre.apellidos || '', Validators.required],
      fechaPaNaci: [this.niño?.padre.fechaNacimiento || '', Validators.required],
      edad: [this.niño?.padre.edad || '', Validators.required],
      telefono: [this.niño?.padre.telefono || '', Validators.required]
    });

    this.formControlMadre = this._formBuilder.group({
      cedulam: [this.niño?.madre.cedula || '', Validators.required],
      nombresm: [this.niño?.madre.cedula || '', Validators.required],
      apellidosm: [this.niño?.madre.cedula || '', Validators.required],
      fechaPaNacim: [this.niño?.madre.cedula || '', Validators.required],
      edadm: [this.niño?.madre.cedula || '', Validators.required],
      telefonom: [this.niño?.madre.cedula || '', Validators.required]
    });

  }
  isLinear = false;


  crear() {
    const datosNiño: NinoEntity = this.obtenerDatosNiño();
    console.log('datosNiño', datosNiño)
    this.niñoService.crearNino(datosNiño).subscribe(
      {
        next: resp => {
          if (resp != null) {
            this.mensajes.mostrarMensaje('Informacion del sistema', 'Niño creado con exito', 2000);
            this.limpiarCampos();
          } else {
            this.mensajes.mostrarMensaje('Informacion del sistema', 'Registro no creado:', 2000)
          }
        },
        error: error => this.mensajes.mostrarMensaje('Informacion del sistema', 'Registro no creado: '.concat(error), 2000)
      }
    );
    console.log(this.obtenerDatosNiño());
  }

  obtenerDatosNiño(): NinoEntity {
    const datosNiño: NinoEntity = {
      cedula: this.firstFormGroup.get('cedula').value,
      nombres: this.firstFormGroup.get('nombre').value,
      apellidos: this.firstFormGroup.get('apellido').value,
      fechaNacimiento: this.firstFormGroup.get('fechaNacN').value,
      lugarNacimiento: this.firstFormGroup.get('lugnac').value,
      edad: this.firstFormGroup.get('edad').value,
      sexo: this.firstFormGroup.get('sexo').value,
      ausente: false,
      bautizo: {
        fecha: this.secondFormGroup.get('fechaPa').value,
        descripcionPadrino: this.secondFormGroup.get('descripcionpadrino').value,
        matrimoniosPadres: this.secondFormGroup.get('matromoniopadres').value
      },
      casa: {
        idCasa: this.casaForm.get('casaControl').value,
      },
      padre: {
        cedula: this.formControlPadre.get('cedula').value,
        nombre: this.formControlPadre.get('nombres').value,
        apellidos: this.formControlPadre.get('apellidos').value,
        fechaNacimiento: this.formControlPadre.get('fechaPaNaci').value,
        edad: this.formControlPadre.get('edad').value,
        telefono: this.formControlPadre.get('telefono').value
      },
      madre: {
        cedula: this.formControlMadre.get('cedulam').value,
        nombre: this.formControlMadre.get('nombresm').value,
        apellidos: this.formControlMadre.get('apellidosm').value,
        fechaNacimiento: this.formControlMadre.get('fechaPaNacim').value,
        edad: this.formControlMadre.get('edadm').value,
        telefono: this.formControlMadre.get('telefonom').value
      },
      estudios: []
    };

    return datosNiño;
  }

  getNiñoByCedula() {
    if(this.niño.cedula){
      this.firstFormGroup.get('cedula').disable();
    }
    // this.firstFormGroup.patchValue({
    //   cedula: datos.cedula
    // })
  }

  limpiarCampos() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.formControlPadre.reset();
    this.formControlMadre.reset();
    this.casaForm.reset();
  }

}






