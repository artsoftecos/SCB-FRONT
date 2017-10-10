import { Component, OnInit } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pending-publish-convocatory',
  templateUrl: './pending-publish-convocatory.component.html',
  styleUrls: ['./pending-publish-convocatory.component.css']
})
export class PendingPublishConvocatoryComponent implements OnInit {

  modalActionsCreatePhase = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  openModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['open']});
  }
  closeModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['close']});
  }

}
