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
import { ApplicantConvocatoryService } from '../services/applicant-convocatory.service'
import { ApplicantRoutingModule } from './applicant-routing.module';
import { FormComponent } from './form/form.component';
import { DynamicFormComponent } from './form/question/dynamic-form.component';
import { DynamicFormQuestionComponent } from './form/question/dynamic-form-question.component';
import { HomeComponent } from './home/home.component';
import { PublishedListConvocatoryComponent } from './published-list-convocatory/published-list-convocatory.component';
import { InscribedListConvocatoryComponent } from './inscribed-list-convocatory/inscribed-list-convocatory.component';
import { PlacesListConvocatoryComponent } from './places-list-convocatory/places-list-convocatory.component';


@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicantRoutingModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  declarations: [
    ValidateComponent,
    CreateComponent, UploadDocumentsComponent,
    //Forms
    FormComponent, DynamicFormComponent, DynamicFormQuestionComponent, HomeComponent, PublishedListConvocatoryComponent, InscribedListConvocatoryComponent, PlacesListConvocatoryComponent
  ],
  exports: [
    CreateComponent
  ],
  providers: [
    ApplicantConvocatoryService
  ]
})
export class ApplicantModule { }
