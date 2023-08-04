export class NinoEntity {
    cedula: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    lugarNacimiento: string;
    edad: number;
    sexo: string;
    ausente: boolean;
    bautizo: Bautizo;
    casa: Casa;
    padre: Padre;
    madre: Madre;
    estudios: Estudios[];

    constructor() {
        this.bautizo = new Bautizo();
        this.casa = new Casa();
        this.padre = new Padre();
        this.madre = new Madre();
        this.estudios = [];
    }
}

export class dataNiñoService {
    private datosniño: NinoEntity = new NinoEntity();

    get getNiño(): NinoEntity {
        return this.datosniño;
    }

    set setNiño(datos: NinoEntity) {
        this.datosniño = datos;
    }
}


export class Bautizo {
    idBautismo?: number
    fecha: string
    descripcionPadrino: string
    matrimoniosPadres: string
}

class Casa {
    idCasa: number;
    numeroCasa?: string;
    nombrecasa?: string;
    telefono?: string;
    direccion?: string;
    img?: string;
    estado?: number;
    bitacora?: Bitacora;
}

class Bitacora { }

class Padre {
    cedula: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date;
    edad: number;
    telefono: string;
}

class Madre {
    cedula: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date;
    edad: number;
    telefono: string;
}

class Estudios {
    nino?: NinoEntity;
    niveles?: string;
    nombreInstitucion?: string;
    sotenimiento?: string;
    provincia?: string;
    ciudad?: string;
    jornada?: string;
    regimenEscolar?: string;
    modalidad?: string;
    promedio?: number;

}