import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { ApplicantModule } from './applicant/applicant.module';
import { SecurityModule } from './security/security.module';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { FileUploadComponent } from './input-fields/file-upload/file-upload.component';

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
