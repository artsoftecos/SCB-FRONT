import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule 
  ],
  declarations: [RegisterComponent],
  exports: [
    RegisterComponent
  ]
})
export class ApplicantModule { }
