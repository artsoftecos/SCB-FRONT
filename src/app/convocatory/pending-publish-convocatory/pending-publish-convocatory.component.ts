import { Component, OnInit } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Convocatory } from '../../models/convocatory';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConvocatoryService } from '../../services/convocatory.service';

@Component({
  selector: 'app-pending-publish-convocatory',
  templateUrl: './pending-publish-convocatory.component.html',
  styleUrls: ['./pending-publish-convocatory.component.css']
})
export class PendingPublishConvocatoryComponent implements OnInit {

  modalActionsCreatePhase = new EventEmitter<string|MaterializeAction>();
  convocatory: Convocatory;

  constructor(private route: ActivatedRoute, private convocatoryService: ConvocatoryService) { 
    console.log("1");
    this.convocatory = new Convocatory();
    this.convocatory.name="aaaa";
    this.convocatory.numberBeneficiaries = 24;
  }

  ngOnInit() {
    console.log("2");
    /*this.convocatory = new Convocatory();
    this.convocatory.name="aaaa";
    this.convocatory.numberBeneficiaries = 24;*/
    /*this.route.paramMap
    .switchMap((params: ParamMap) => this.convocatoryService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(convocatory => this.convocatory = convocatory);*/
  }

  openModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['open']});
  }
  closeModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['close']});
  }


  
}
