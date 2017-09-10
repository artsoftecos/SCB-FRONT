import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component'
import { RegisterComponent } from './home/register/register.component'
import { LoginComponent } from './security/login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { UploadDocumentsComponent } from './applicant/upload-documents/upload-documents.component';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload_document', component: UploadDocumentsComponent },
  { path: 'administrator',  component: AdministratorComponent, children:[

  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
