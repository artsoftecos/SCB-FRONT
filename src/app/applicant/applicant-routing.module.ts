import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component'
import { PublishedDetailConvocatoryComponent } from './published-detail-convocatory/published-detail-convocatory.component'

const routes: Routes = [  
  { path: 'HomeApplicant',  component: HomeComponent, children:[
      ]},
      {path: 'DetailPublishedConvocatory/:id',  component: PublishedDetailConvocatoryComponent}
];


@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
   exports : [RouterModule],
  declarations: []
})
export class ApplicantRoutingModule { }