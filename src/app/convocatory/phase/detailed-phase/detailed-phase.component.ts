import { Component, OnInit, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Phase } from '../../../models/phase';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhaseService } from '../../../services/phase-service';
import { Location } from '@angular/common';
import { AddFieldComponent } from '../../../input-fields/add-field/add-field.component';
import { FieldModel } from '../../../models/field.model';

@Component({
  selector: 'app-detailed-phase',
  templateUrl: './detailed-phase.component.html',
  styleUrls: ['./detailed-phase.component.css']
})
export class DetailedPhaseComponent implements OnInit {

  modalActionsCreateFields = new EventEmitter<string|MaterializeAction>();
  modalActionsUpdatePhase = new EventEmitter<string|MaterializeAction>();  
  // @Input() fields: AddFieldComponent[];
  fields: FieldModel[];
  // fields = [];
  phase: Phase;
  

  constructor(private location: Location, private route: ActivatedRoute, private phaseService: PhaseService) {
    this.fields = [];
    this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(phase => 
      {
        console.log(phase);
        this.phase = phase;
      });
  }

  ngOnInit() {
  }

  onDeletedField(arg){
    console.log("ENTRA BORRAR")
    let auxField = JSON.parse(JSON.stringify(arg));
    for(var i = 0; i < this.fields.length; i++){
      if(this.fields[i].orden > auxField.orden){
        this.fields[i].orden -= 1;
      }
    }
    console.log(this.fields)
    console.log(auxField.orden)
    this.fields.splice(auxField.orden-1, 1);
  }

  onCreatedField(arg){
    let auxField = JSON.parse(JSON.stringify(arg))
    auxField.orden = this.fields.length+1;
    this.fields.push(auxField);
  }

/*   openModalCreateFields() {
    this.modalActionsCreateFields.emit({action:"modal",params:['open']});
  }
  closeModalCreateFields() {
    this.modalActionsCreateFields.emit({action:"modal",params:['close']});
  } */

  openModalUpdatePhase() {
    this.modalActionsUpdatePhase.emit({action:"modal",params:['open']});
  }
  closeModalUpdatePhase() {
    this.modalActionsUpdatePhase.emit({action:"modal",params:['close']});
  }

  goBack(): void {
    this.location.back();
  }
}
