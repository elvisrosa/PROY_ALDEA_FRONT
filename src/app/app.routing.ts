import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import * as path from 'path';
import { VisorPdfsComponent } from './components/visor-pdfs/visor-pdfs.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {
    path: 'niñoscrear',
    redirectTo: 'crear-niños',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [LoginGuard],
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: 'visor-pdf',
    component: VisorPdfsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
