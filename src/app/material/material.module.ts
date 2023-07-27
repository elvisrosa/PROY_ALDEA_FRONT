import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//ANGULAR  MATERIAL
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatStepperModule
  ]
})
export class MaterialModule { }
