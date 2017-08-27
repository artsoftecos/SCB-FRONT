import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { ValidateComponent } from './validate/validate.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule 
  ],
  declarations: [ ValidateComponent, CreateComponent],
  exports: [
    CreateComponent
  ]
})
export class ApplicantModule { }
