import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BitacoraCasaComponent } from './bitacora-casa/bitacora-casa.component';
import { VisorPdfsComponent } from './visor-pdfs/visor-pdfs.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParticipantsTableComponent } from './participants-table/participants-table.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatButtonModule, 
    MatIconModule

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BitacoraCasaComponent,
    VisorPdfsComponent,
    ParticipantsTableComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
