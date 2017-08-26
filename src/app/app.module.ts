//Libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
//Modules
import { ApplicantModule } from './applicant/applicant.module';
import { SecurityModule } from './security/security.module';
import { AppRoutingModule } from './app-routing.module';
//Components
import { HomeComponent } from './home/home.component';
import { FileUploadComponent } from './input-fields/file-upload/file-upload.component';
import { AppComponent } from './app.component';
//Services
import { UserService } from './services/user.service';
//Pipes


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    ApplicantModule,
    SecurityModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
