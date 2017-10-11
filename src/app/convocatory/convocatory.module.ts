import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateConvocatoryComponent } from './create-convocatory/create-convocatory.component';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { ConvocatoryTypeService } from '../services/convocatory-type.service'
import { ConvocatoryService } from '../services/convocatory.service'
import { AuthService } from '../services/auth.service';
import { PhaseService  } from '../services/phase-service';
import { PublishedListConvocatoryComponent } from './published-list-convocatory/published-list-convocatory.component';
import { PendingPublishListConvocatoryComponent } from './pending-publish-list-convocatory/pending-publish-list-convocatory.component';
import { DetailedConvocatoryComponent } from './detailed-convocatory/detailed-convocatory.component';
import { ListPhasesComponent } from './phase/list-phases/list-phases.component';
import { CreatePhaseComponent } from './phase/create-phase/create-phase.component';
import { UpdatePhaseComponent } from './phase/update-phase/update-phase.component';
import { DetailedPhaseComponent } from './phase/detailed-phase/detailed-phase.component';
import { PostulatedConvocatoryComponent } from './postulation/postulated-convocatory/postulated-convocatory.component';
import { ConvocatoryRoutingModule } from './convocatory-routing.module';
import { PublishedConvocatoryComponent } from './published-convocatory/published-convocatory.component';
import { PendingPublishConvocatoryComponent } from './pending-publish-convocatory/pending-publish-convocatory.component';
import { DetailBasicConvocatoryComponent } from './detail-basic-convocatory/detail-basic-convocatory.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ConvocatoryRoutingModule
  ],
  exports: [CreateConvocatoryComponent, PendingPublishListConvocatoryComponent, PublishedListConvocatoryComponent],
  declarations: [CreateConvocatoryComponent, PublishedListConvocatoryComponent, PendingPublishListConvocatoryComponent, DetailedConvocatoryComponent, ListPhasesComponent, CreatePhaseComponent, UpdatePhaseComponent, DetailedPhaseComponent, PostulatedConvocatoryComponent, PublishedConvocatoryComponent, PendingPublishConvocatoryComponent, DetailBasicConvocatoryComponent],
  providers: [ConvocatoryTypeService, ConvocatoryService, AuthService, PhaseService]
})
export class ConvocatoryModule { }
