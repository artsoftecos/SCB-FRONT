import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublishedConvocatoryComponent } from './published-convocatory/published-convocatory.component'
import { DetailedPhaseComponent } from './phase/detailed-phase/detailed-phase.component'
import { DetailedConvocatoryComponent } from './detailed-convocatory/detailed-convocatory.component'
import { ApproveApplicantsComponent } from './approve-applicants/approve-applicants.component'

const routes: Routes = [  
  { path: 'convocatory/:id',  component: DetailedConvocatoryComponent },
  { path: 'approveApplicants/:id',  component: ApproveApplicantsComponent },
  { path: 'phase/:id',  component: DetailedPhaseComponent }
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
