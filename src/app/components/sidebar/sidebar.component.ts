import { OnInit } from '@angular/core';
import { AuthService } from 'app/services/login.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles?:string[];
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Mis cursos',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
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
  constructor(private auth:AuthService) { 
    this.dataSource.data = TREE_DATA;
  }


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

 

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit():void {
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
