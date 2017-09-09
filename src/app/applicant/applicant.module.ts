import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { ValidateComponent } from './validate/validate.component';
import { CreateComponent } from './create/create.component';
import { RecaptchaModule } from 'ng2-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  declarations: [ 
    ValidateComponent, 
    CreateComponent
  ],
  exports: [
    CreateComponent
  ]
})
export class ApplicantModule { }
