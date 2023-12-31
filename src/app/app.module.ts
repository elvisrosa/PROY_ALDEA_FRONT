import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './layouts/buttons/button/button.component';
import { NinosCrearComponent } from './modules/ninos-crear/ninos-crear.component';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { dataUsuarioService } from './models/usuario.model';
import { TableListComponent } from './table-list/table-list.component';
import { DataTablesModule } from 'angular-datatables';
import { dataNiñoService } from './models/niño.modelo';
import { CasasComponent } from './casas/casas.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule
    

  ],
  declarations: [
    AppComponent,
    //CasasComponent,
    AdminLayoutComponent,
    LoginComponent,
    ButtonComponent,
    NinosCrearComponent,
    TableListComponent,
    //UpgradeComponent

  ],
  providers: [dataUsuarioService,dataNiñoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
