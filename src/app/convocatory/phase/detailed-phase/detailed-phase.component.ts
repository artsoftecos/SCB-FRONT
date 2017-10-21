import { Component, OnInit } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Phase } from '../../../models/phase';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhaseService } from '../../../services/phase-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailed-phase',
  templateUrl: './detailed-phase.component.html',
  styleUrls: ['./detailed-phase.component.css']
})
export class DetailedPhaseComponent implements OnInit {

  modalActionsCreateFields = new EventEmitter<string|MaterializeAction>();
  modalActionsUpdatePhase = new EventEmitter<string|MaterializeAction>();  
  phase: Phase;

  constructor(private location: Location, private route: ActivatedRoute, private phaseService: PhaseService) { 
    console.log("1");
    this.phase = new Phase();
    this.phase.name="aaaa";
    this.phase.startDate = "122222";
    this.phase.finishDate = "131231";
    this.phase.startApprovalPostulation = "1112251";
    this.phase.id = 1;
    this.phase.description ="Descrrrrr";    
    console.log(this.phase);  
  }

  ngOnInit() {
    console.log("2");
    //TODO: UnComment this part
    /*this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(phase => this.phase = phase);*/
  }

  openModalCreateFields() {
    this.modalActionsCreateFields.emit({action:"modal",params:['open']});
  }
  closeModalCreateFields() {
    this.modalActionsCreateFields.emit({action:"modal",params:['close']});
  }

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
