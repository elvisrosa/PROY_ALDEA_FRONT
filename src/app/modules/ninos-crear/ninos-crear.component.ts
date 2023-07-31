import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NiñoService } from 'app/services/niño.service';
import { NinoEntity } from 'app/models/niño.modelo';
import { MensajesService } from 'app/services/mensajes.service';
import { CasaServiceService } from 'app/services/casa-service.service';
import { Casa } from 'app/models/casa.modelo';


@Component({
  selector: 'app-ninos-crear',
  templateUrl: './ninos-crear.component.html',
  styleUrls: ['./ninos-crear.component.scss']
})
export class NinosCrearComponent implements OnInit {

  casas: Casa[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlPadre: FormGroup;
  formControlMadre: FormGroup;
  casaForm: FormGroup;



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

  }

  initFor() {
    this.firstFormGroup = this._formBuilder.group({
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fechaNacN: ['', [Validators.required]],
      lugnac: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sexo: ['', [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
      fechaPa: ['', Validators.required],
      descripcionpadrino: ['', Validators.required],
      matromoniopadres: ['', Validators.required]
    });

    this.casaForm = this._formBuilder.group({
      casaControl: ['', Validators.required]
    });

    this.formControlPadre = this._formBuilder.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaPaNaci: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.formControlMadre = this._formBuilder.group({
      cedulam: ['', Validators.required],
      nombresm: ['', Validators.required],
      apellidosm: ['', Validators.required],
      fechaPaNacim: ['', Validators.required],
      edadm: ['', Validators.required],
      telefonom: ['', Validators.required]
    });

  }
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
    private niñoService: NiñoService,
    private mensajes: MensajesService,
    private casaService: CasaServiceService) { }

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

  limpiarCampos() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.formControlPadre.reset();
    this.formControlMadre.reset();
    this.casaForm.reset();
  }

}






