import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateConvocatoryComponent } from './create-convocatory/create-convocatory.component';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { ConvocatoryTypeService } from '../services/convocatory-type.service'
import { ConvocatoryService } from '../services/convocatory.service'
import { AuthService } from '../services/auth.service'

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule
  ],
  exports: [CreateConvocatoryComponent],
  declarations: [CreateConvocatoryComponent],
  providers: [ConvocatoryTypeService, ConvocatoryService, AuthService]
})
export class ConvocatoryModule { }
