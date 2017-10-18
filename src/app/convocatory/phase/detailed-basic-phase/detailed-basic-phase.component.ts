import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '../../../models/phase';

@Component({
  selector: 'app-detailed-basic-phase',
  templateUrl: './detailed-basic-phase.component.html',
  styleUrls: ['./detailed-basic-phase.component.css']
})
export class DetailedBasicPhaseComponent implements OnInit {

  @Input()
  phase: Phase;

  constructor() { 
  }

  ngOnInit() {
    console.log(this.phase);
  }

}
