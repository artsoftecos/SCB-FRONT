import { Component, OnInit, EventEmitter, Input, SimpleChanges, SimpleChange, 
  OnChanges } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router } from '@angular/router';
import { PhaseService } from '../../../services/phase-service';
import { Phase } from '../../../models/phase';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.css']
})
export class ListPhasesComponent implements OnChanges, OnInit {
  actions1 = new EventEmitter<string|MaterializeAction>();
  phases : Phase[];
  @Input() 
  convocatoryId: number;
  
  @Input() 
  includeApproveApplicants: boolean;

  constructor(private router: Router, private phaseService: PhaseService) { }

  ngOnInit() {
    /*let phaseOne = new Phase();
    phaseOne.id = 1;
    phaseOne.name = "nombre 1";
    phaseOne.description = "description 1";
    phaseOne.startDate = "2017/05/21";
    phaseOne.endDate = "2018/05/21";
    phaseOne.startApprovalDate = "2016/05/21";

    let phaseTwo = new Phase();
    phaseTwo.id = 2;
    phaseTwo.name = "nombre 2";
    phaseTwo.description = "description 2";
    phaseTwo.startDate = "3017/05/21";
    phaseTwo.endDate = "3018/05/21";
    phaseTwo.startApprovalDate = "3016/05/21";

    //this.phases = new Phase[1];
    this.phases= [phaseOne, phaseTwo];*/
    this.loadPhases();
  }

  ngAfterViewInit() {    
    $('.collapsible').collapsible({
      accordion : true
    });
  }

  params = [
      {
        onOpen: (el) => {
          console.log("Collapsible open", el);
        },
        onClose: (el) => {
          console.log("Collapsible close", el);
        }
      }
    ];

    values = ["First", "Second", "Third"];

    openFirst() {
      this.actions1.emit({action:"collapsible",params:['open',0]});
    }

    closeFirst() {
      this.actions1.emit({action:"collapsible",params:['close',0]});
    }

    loadPhases() {
      this.phaseService.getByConvocatory(this.convocatoryId)
      .subscribe(phases => {
        console.log(phases);
        this.phases = phases;
      });
    }

    goToPhase(phaseId: number) {
      this.router.navigate(['/phase/'+ phaseId]);
    }

    ngOnChanges(changes: SimpleChanges) {
      console.log('Change - ');
      console.log(changes);
      const conv: SimpleChange = changes.convocatoryId;
      /*console.log('prev value: ', name.previousValue);
      console.log('got name: ', name.currentValue);*/
      console.log('current');
      console.log(conv.currentValue);
      console.log('previous');
      console.log(conv.previousValue);
      this.convocatoryId = conv.currentValue;
    }
}
