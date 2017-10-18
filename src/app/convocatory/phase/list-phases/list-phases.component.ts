import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { PhaseService } from '../../../services/phase-service';
import { Phase } from '../../../models/phase';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.css']
})
export class ListPhasesComponent implements OnInit {
  actions1 = new EventEmitter<string|MaterializeAction>();
  phases : Phase[];
  @Input() 
  convocatoryId: number;

  constructor(private phaseService: PhaseService) { }

  ngOnInit() {
    let phaseOne = new Phase();
    phaseOne.name = "nombre 1";
    phaseOne.description = "description 1";
    phaseOne.startDate = "2017/05/21";
    phaseOne.finishDate = "2018/05/21";
    phaseOne.startApprovalPostulation = "2016/05/21";

    //this.phases = new Phase[1];
    this.phases[0] = phaseOne;
    //this.loadPhases();
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
        this.phases = phases;
      });
    }
}
