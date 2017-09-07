import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { MaterializeModule } from "angular2-materialize";

@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule 
  ],
  declarations: [CreateComponent],
  exports: [
    CreateComponent
  ]
})
export class OffererModule { }
