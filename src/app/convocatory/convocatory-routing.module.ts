import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailedConvocatoryComponent } from './detailed-convocatory/detailed-convocatory.component'

const routes: Routes = [  
  { path: 'convocatory-detail/:id',  component: DetailedConvocatoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class ConvocatoryRoutingModule { }
