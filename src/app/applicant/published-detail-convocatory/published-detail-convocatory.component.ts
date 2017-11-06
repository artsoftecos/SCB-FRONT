
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { EventEmitter } from '@angular/core';
import { Convocatory } from '../../models/convocatory';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConvocatoryService } from '../../services/convocatory.service';
import { PhaseService } from '../../services/phase-service';
import { ConvocatoryType } from '../../models/convocatory-type';
import { Location } from '@angular/common';
import { ConvocatoryState } from '../../models/convocatory-state';
import { Phase } from '../../models/phase';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-published-detail-convocatory',
  templateUrl: './published-detail-convocatory.component.html',
  styleUrls: ['./published-detail-convocatory.component.css']
})
export class PublishedDetailConvocatoryComponent implements OnInit {
  actions1 = new EventEmitter<string|MaterializeAction>();
  convocatory: Convocatory;
  phaseToApply: Phase;

  constructor(private location: Location, 
    private route: ActivatedRoute, private convocatoryService: ConvocatoryService,
      private phaseService: PhaseService, private router: Router) { 
        console.log("llego");
    this.route.paramMap
      .switchMap((params: ParamMap) => this.convocatoryService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
      .subscribe(convocatory => {
        console.log(convocatory);
        this.convocatory = convocatory;
        this.loadPhase();       
      });
  }

  ngOnInit() {
    $('.collapsible').collapsible({
      accordion : true
    });
  }

  goBack(): void {
    this.location.back();
  }

  loadPhase(){
    this.phaseService.getByConvocatory(this.convocatory.id)
    .subscribe(phases => {
      console.log(phases);   
      console.log(phases[0]);      
      this.phaseToApply = phases[0];
    });
  }

  goToApply() {
    //TODO: Sebastian aca pone la navegacion para ir a sus campos.
    //O solo se quitaria y se llamaria un metodo para aplicar a esta convocatoria.
    //El parametro q quiera.. convocatoria o fase
    this.router.navigate(['/ruta.../'+ this.convocatory.id]);
  }

  ngAfterViewInit() {    
    $('.collapsible').collapsible({
      accordion : true
    });
  }
}