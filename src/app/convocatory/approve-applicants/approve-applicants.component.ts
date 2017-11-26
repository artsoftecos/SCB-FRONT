import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';//TODO: implementada por que en el HTML se hace referencia, debe estar?
import { EventEmitter } from '@angular/core';//TODO: implementada por que en el HTML se hace referencia, debe estar?
import { Phase } from '../../models/phase';//TODO: implementada por que en el HTML se hace referencia, debe estar?

@Component({
  selector: 'app-approve-applicants',
  templateUrl: './approve-applicants.component.html',
  styleUrls: ['./approve-applicants.component.css']
})
export class ApproveApplicantsComponent implements OnInit {

  constructor(private location: Location) { }
  fields : any[]; //TODO: implementada por que en el HTML se hace referencia, debe estar?
  phase: Phase;//TODO: implementada por que en el HTML se hace referencia, debe estar?

  modalActionsUpdatePhase = new EventEmitter<string|MaterializeAction>();  //TODO: implementada por que en el HTML se hace referencia, debe estar?

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  closeModalUpdatePhase(){
    //TODO: implementada por que en el HTML se hace referencia, debe estar?
  }

  closeModal(){
    //TODO: implementada por que en el HTML se hace referencia, debe estar?
  }
}
