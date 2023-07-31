export interface UsuarioModel {
    username: string;
    nombre: string;
    locked?: boolean;
    disabled?: boolean;
    password: string;
    correo: string;
    roles: Role[];
    tutor?: Tutor;
}

export interface Role{
    role:string;
}

export interface Tutor{
    idTutora?:number;
    nombre?:string;
    apellido:string;
    correo?:string;
    telefono:string;
    cedula:string;
}