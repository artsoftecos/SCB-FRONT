import { Component, OnInit } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
import { Convocatory } from '../../models/convocatory';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConvocatoryService } from '../../services/convocatory.service';
import { ConvocatoryType } from '../../models/convocatory-type';
import { Location } from '@angular/common';
import { ConvocatoryState } from '../../models/convocatory-state';

@Component({
  selector: 'app-detailed-convocatory',
  templateUrl: './detailed-convocatory.component.html',
  styleUrls: ['./detailed-convocatory.component.css']
})
export class DetailedConvocatoryComponent implements OnInit {

  modalActionsCreatePhase = new EventEmitter<string|MaterializeAction>();
  modalActionsUpdateConvocatory = new EventEmitter<string|MaterializeAction>();
  isAbleEdit: boolean = true;
  convocatory: Convocatory;

  constructor(private location: Location, 
    private route: ActivatedRoute, private convocatoryService: ConvocatoryService) { 
    console.log("1");
    this.convocatory = new Convocatory();
    this.convocatory.name="aaaa";
    this.convocatory.numberBeneficiaries = 24;
    this.convocatory.convocatoryType = new ConvocatoryType();
    this.convocatory.convocatoryType.name = "pepito";
    this.convocatory.resultDate = "2017-01-01";
    this.convocatory.convocatoryState = new ConvocatoryState();
    this.convocatory.convocatoryState.name = "Pusblicada"; 
    console.log(this.convocatory);  
  }

  ngOnInit() {
    console.log("2");
    /*this.convocatory = new Convocatory();
    this.convocatory.name="aaaa";
    this.convocatory.numberBeneficiaries = 24;*/
    //TODO: UnComment this part
    /*this.route.paramMap
    .switchMap((params: ParamMap) => this.convocatoryService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(convocatory => this.convocatory = convocatory);*/
    if (this.convocatory.convocatoryState.name === 'Publicada'){
      this.isAbleEdit= false;
    }
  }

  openModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['open']});
  }
  closeModalCreatePhase() {
    this.modalActionsCreatePhase.emit({action:"modal",params:['close']});
  }

  openModalUpdateConvocatory() {
    this.modalActionsUpdateConvocatory.emit({action:"modal",params:['open']});
  }
  closeModalUpdateConvocatory() {
    this.modalActionsUpdateConvocatory.emit({action:"modal",params:['close']});
  }

  goBack(): void {
    this.location.back();
  }

  
}
