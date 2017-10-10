import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.css']
})
export class ListPhasesComponent implements OnInit {
  actions1 = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
    // Materialize('.collapsible').collapsible();
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
}
