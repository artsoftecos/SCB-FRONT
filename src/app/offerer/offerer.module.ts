import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { MaterializeModule } from "angular2-materialize";
import { RecaptchaModule } from 'ng2-recaptcha';

@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    RecaptchaModule.forRoot(),
  ],
  declarations: [CreateComponent],
  exports: [
    CreateComponent
  ]
})
export class OffererModule { }
