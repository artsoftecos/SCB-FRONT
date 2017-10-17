import { ReactiveFormsModule }          from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { ValidateComponent } from './validate/validate.component';
import { CreateComponent } from './create/create.component';
import { RecaptchaModule } from 'ng2-recaptcha';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
//Forms

import { FormComponent } from './form/form.component';
import { DynamicFormComponent } from './form/question/dynamic-form.component';
import { DynamicFormQuestionComponent } from './form/question/dynamic-form-question.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  declarations: [
    ValidateComponent,
    CreateComponent, UploadDocumentsComponent,
    //Forms
    FormComponent, DynamicFormComponent, DynamicFormQuestionComponent
  ],
  exports: [
    CreateComponent
  ]
})
export class ApplicantModule { }
