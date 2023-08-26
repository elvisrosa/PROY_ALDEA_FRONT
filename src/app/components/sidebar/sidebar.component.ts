import { AfterContentInit, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SharingServicesService } from 'app/services/sharing-services.service';
import { Casa } from 'app/models/casa.modelo';
import { Subscription } from 'rxjs';
import { NiñoService } from 'app/services/niño.service';


declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles?: string[];
}

interface FoodNode {
  id: number;
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  // {
  //   name: 'Mis cursos',
  //   children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  // },
  {
    id: 0,
    name: 'Mis cursos',
    children: [
      {
        id: null,
        name: null,
        children: null,
      },
      // {
      //   name: 'Casa 2',
      //   children: [{ name: 'Participantes' }, { name: 'Casa2' }],
      // },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
export const ROUTES: RouteInfo[] = [
  { path: '/principal', title: 'Principal', icon: 'dashboard', class: '', roles: ['ADMIN', 'ADMINT', 'TUTOR'] },
  { path: '/crear-niños', title: 'Crear Niño', icon: 'library_books', class: '', roles: ['ADMIN', 'ADMINT'] },
  { path: '/casas', title: 'Casas', icon: 'home', class: '', roles: ['ADMIN', 'ADMINT'] },
  { path: '/lista-niños', title: 'Niños', icon: 'content_paste', class: '', roles: ['ADMIN', 'ADMINT'] },
  { path: '/notifications', title: 'Notificaciones', icon: 'notifications', class: '', roles: ['ADMIN', 'ADMINT', 'TUTOR'] },
  { path: '/perfil-usuario', title: 'Usuario - Crear', icon: 'person', class: '', roles: ['ADMIN', 'ADMINT'] },
  { path: '/permiso-tutores', title: 'Permiso Tutores', icon: 'supervisor_account', class: '', roles: ['ADMINT'] },
  { path: '/visor-pdf', title: 'Visor de Pdfs', icon: 'visibility', class: 'nav-item flex-end', roles: ['ADMINT', 'ADMIN'] },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements OnInit, OnDestroy {


  casa: Casa[] = [];
  menuItems: any[];
  roles: string[];
  //data$: Observable<Casa[]>;
  casaSubscription: Subscription | undefined;


  ngOnInit(): void {
    this.sharingS.getDataSharing.subscribe({
      next: (resp: any) => {
        this.roles = [...resp.roles];
        this.menuItems = this.filtarRouterPorRole(this.roles);
      }
    });
    this.cargarArbolTree();
  }

  constructor(
    private sharingS: SharingServicesService,
    private niñoService: NiñoService
  ) { }


  ngOnDestroy(): void {
    if (this.casaSubscription) {
      this.casaSubscription?.unsubscribe();
    }
  }

  cargarArbolTree(): void {
    this.casaSubscription = this.sharingS.getCasaSharing.subscribe(
      {
        next: (resp: Casa[]) => {
          this.casa = resp;
          let casaChildren = null;
          if (this.casa != null) {
            casaChildren = this.casa.map(casa => ({
              name: casa.nombrecasa,
              children: [
                { name: casa.nombrecasa }, { name: 'Participantes', id: casa.idCasa }
              ]
            }));
          };

          const misCursosIndex = TREE_DATA.findIndex(node => node.name === 'Mis cursos');
          if (misCursosIndex !== -1) {
            TREE_DATA[misCursosIndex].children = casaChildren;
          };
          this.dataSource.data = TREE_DATA
        },
        error: (error) => console.log(error)
      }

    );
  }


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id, //agregado
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

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  filtarRouterPorRole(userRoles: string[]): RouteInfo[] {
    return ROUTES.filter(route => {
      return route.roles.some(role => userRoles.includes(role));
    });
  }

  findByIdHouse($event) {
    if ($event.id === undefined) return;
    if ($event.id !== undefined || $event.id !== 0) {
      this.niñoService.findByIdCasa($event.id).subscribe(
        {
          next: (resp) => this.sharingS.setDataListNiños = resp
        }
      )
    }
  }
}
