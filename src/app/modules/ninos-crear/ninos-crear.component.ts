import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'app/services/mensajes.service';
import { CasaServiceService } from 'app/services/casa-service.service';
import { Casa } from 'app/models/casa.modelo';
import { NinoEntity, dataNiñoService } from 'app/models/niño.modelo';
import { NiñoService } from 'app/services/niño.service';
import { Router } from '@angular/router';
import { ENUN } from '../../../environments/environment.prod';

@Component({
  selector: 'app-ninos-crear',
  templateUrl: './ninos-crear.component.html',
  styleUrls: ['./ninos-crear.component.scss']
})

export class NinosCrearComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private niñoService: NiñoService,
    private mensajes: MensajesService,
    private casaService: CasaServiceService,
    private dataninoService?: dataNiñoService,
  ) { }


  casas: Casa[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlPadre: FormGroup;
  formControlMadre: FormGroup;
  casaForm: FormGroup;
  public nino: NinoEntity = this.dataninoService.getNiño;



  ngOnInit(): void {
    this.casaService.obetenerCasas().subscribe(
      {
        next: (resp: any) => {
          this.casas = [...resp];
        }
      }
    )
    this.initFor();

  }

  initFor() {
    this.firstFormGroup = this._formBuilder.group({
      cedula: [this.nino?.cedula || '', [Validators.required]],
      nombre: [this.nino?.nombres || '', [Validators.required]],
      apellido: [this.nino?.apellidos || '', [Validators.required]],
      fecha_nacimiento_niño: [this.nino?.fechaNacimiento || '', [Validators.required]],
      lugnac: [this.nino?.lugarNacimiento || '', [Validators.required]],
      edad: [this.nino?.edad || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sexo: [this.nino?.sexo, [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
      fechaPa: [this.nino?.bautizo?.fecha || '', Validators.required],
      descripcionpadrino: [this.nino?.bautizo?.descripcionPadrino || '', Validators.required],
      matromoniopadres: [this.nino?.bautizo?.matrimoniosPadres || '', Validators.required]
    });

    this.casaForm = this._formBuilder.group({
      casaControl: [this.nino?.casa?.idCasa || '', Validators.required]
    });

    this.formControlPadre = this._formBuilder.group({
      cedula: [this.nino?.padre?.cedula || '', Validators.required],
      nombres: [this.nino?.padre?.nombre || '', Validators.required],
      apellidos: [this.nino?.padre?.apellidos || '', Validators.required],
      fechaPaNaci: [this.nino?.padre?.fechaNacimiento || '', Validators.required],
      edad: [this.nino?.padre?.edad || '', Validators.required],
      telefono: [this.nino?.padre?.telefono || '', Validators.required]
    });

    this.formControlMadre = this._formBuilder.group({
      cedulam: [this.nino?.madre?.cedula || '', Validators.required],
      nombresm: [this.nino?.madre?.nombre || '', Validators.required],
      apellidosm: [this.nino?.madre?.apellidos || '', Validators.required],
      fechaPaNacim: [this.nino?.madre?.fechaNacimiento || '', Validators.required],
      edadm: [this.nino?.madre?.edad || '', Validators.required],
      telefonom: [this.nino?.madre?.telefono || '', Validators.required]
    });

    this.getninoByCedula();
  }
  isLinear = false;


  public obtenerDatosnino(): NinoEntity {
    const datosnino: NinoEntity = {
      cedula: this.firstFormGroup.get('cedula').value,
      nombres: this.firstFormGroup.get('nombre').value,
      apellidos: this.firstFormGroup.get('apellido').value,
      fechaNacimiento: this.firstFormGroup.get('fecha_nacimiento_niño').value,
      lugarNacimiento: this.firstFormGroup.get('lugnac').value,
      edad: this.firstFormGroup.get('edad').value,
      sexo: this.firstFormGroup.get('sexo').value,
      ausente: false,
      bautizo: {
        idBautismo: this.nino.bautizo.idBautismo,
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

    return datosnino;
  }

  public getninoByCedula() {
    if (this.nino?.cedula) {
      this.firstFormGroup.get('cedula').disable();
    } if (this.nino?.madre?.cedula) {
      this.formControlMadre.get('cedulam').disable();
    } if (this.nino?.padre?.cedula) {
      this.formControlPadre.get('cedula').disable();
    }
    // this.firstFormGroup.patchValue({
    //   cedula: datos.cedula
    // })
  }

  public crear() {
    const datosnino: NinoEntity = this.obtenerDatosnino();
    this.niñoService.crearNino(datosnino).subscribe(
      {
        next: (resp: any) => {
          this.mensajes.mostrarMensaje('Informacion del sistema', resp.message, 2000, ENUN.SUCCES);
          this.limpiarCampos();
          this.router.navigateByUrl('/lista-niños');
        },
        error: (error) => this.mensajes.mostrarMensaje('Informacion del sistema',  error.message.concat(' - ' + error), 2000, ENUN.ERROR)
      }
    );
  }


  public deleteByCedula(cedula: string) {
    const alert = window.confirm('¿Seguro deseas eliminar este registro? ');
    if (alert) {
      this.niñoService.deleteByCedula(cedula).subscribe(
        {
          next: (resp: any) => {
            this.mensajes.mostrarMensaje('Mensaje del sistema', resp.message, 2000, ENUN.SUCCES);
            this.limpiarCampos();
            this.router.navigateByUrl('/lista-niños')
          }
        }
      )
    }
  }

  private limpiarCampos() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.formControlPadre.reset();
    this.formControlMadre.reset();
    this.casaForm.reset();
  }

}






