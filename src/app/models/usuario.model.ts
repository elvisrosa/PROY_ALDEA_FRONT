export class UsuarioModel {
    username?: string;
    nombre?: string;
    locked?: boolean;
    disabled?: boolean;
    password?: string;
    correo?: string;
    roles?: Role[];
    tutor?: Tutor;
}

export class Role{
    role?:string;
    grantedDate?:Date;
}

export class Tutor{
    idTutora?:number;
    nombre?:string;
    apellido?:string;
    correo?:string;
    telefono?:string;
    cedula?:string;
}

export class dataUsuarioService{
    public usuario:UsuarioModel = new UsuarioModel();
  
    set enviarUsuario(user:UsuarioModel){
      this.usuario=user;
    }
  
    get obtenerUsuario(){
      return this.usuario;
    }
  }