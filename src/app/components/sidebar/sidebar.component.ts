import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'app/services/login.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles?:string[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/principal', title: 'Principal',  icon: 'dashboard', class: '', roles:['ADMIN', 'ADMINT', 'TUTOR'] },
    { path: '/crear-niños', title: 'Crear Niño',  icon: 'dashboard', class: '' , roles:['ADMIN', 'ADMINT']},
    { path: '/lista-niños', title: 'Niños',  icon:'content_paste', class: '', roles:['ADMIN', 'ADMINT', 'TUTOR'] },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', roles:['ADMIN', 'ADMINT', 'TUTOR'] },
    { path: '/perfil-usuario', title: 'Usuario - Crear',  icon:'person', class: '', roles:['ADMIN', 'ADMINT'] },
    { path: '/permiso-tutores', title: 'Permiso Tutores',  icon:'unarchive', class: 'active-pro', roles:['ADMINT'] },
    { path: '/visor-pdf', title: 'Visor de Pdfs',  icon:'unarchive', class: '', roles:['ADMINT', 'ADMIN']},

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  roles:string[];

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe( {
      next: (resp:any)=>{
        this.roles=[...resp.roles];
        console.log(this.roles)
        this.menuItems = this.filtarRouterPorRole(this.roles);
      }
    })
   
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  filtarRouterPorRole(userRoles: string[]):RouteInfo[]{
    return ROUTES.filter(route => {
      return route.roles.some(role => userRoles.includes(role));
    });
  }
}
