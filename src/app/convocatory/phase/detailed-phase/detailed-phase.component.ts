import { Component, OnInit, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Phase } from '../../../models/phase';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhaseService } from '../../../services/phase-service';
import { Location } from '@angular/common';
import { AddFieldComponent } from '../../../input-fields/add-field/add-field.component';
import { FieldModel } from '../../../models/field.model';
import { DragulaService } from 'ng2-dragula';

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
  order = 0;
  
  constructor(private location: Location, private route: ActivatedRoute, private phaseService: PhaseService, private dragulaService: DragulaService) {
    this.fields = [];
    this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(phase => {
      this.phase = phase;
    });

    this.phaseService.getFieldsByPhase(13).map((res: Response) => res).subscribe(
      (res) => {
        console.log("RESPUESTA")
        console.log(res)
      },
      (err) => {
        console.log(err)
    });


/*     this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.getFieldsByPhase(+params.get('id')))
    .map((res: Response) => res.json())
    .subscribe(
      (res) => {
        console.log("RESPUESTA")
        console.log(res)
      },
      (err) => {
        console.log(err)
    }); */
    

    this.order = this.fields.length;
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
    let [e, el] = args;
    // this.removeClass(e, 'grabbable_active');
  }

  ngOnInit() {
  }

  onDeletedField(arg){
    let auxField = JSON.parse(JSON.stringify(arg));
    for(var i = 0; i < this.fields.length; i++){
      if(this.fields[i].orden > auxField.orden){
        this.fields[i].orden -= 1;
      }
    }
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
