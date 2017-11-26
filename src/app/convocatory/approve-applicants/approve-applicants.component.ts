import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { PhaseService } from '../../services/phase-service';
import { Applicant } from '../../models/applicant';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Phase } from '../../models/phase';
import { Location } from '@angular/common';

@Component({
  selector: 'app-approve-applicants',
  templateUrl: './approve-applicants.component.html',
  styleUrls: ['./approve-applicants.component.css']
})
export class ApproveApplicantsComponent implements OnInit {

  public aplicants: any = [];
  
  @Input()
  phaseId: number;
  phase: Phase;

  modalActions = new EventEmitter<string | MaterializeAction>();
  aplicantes = []
  constructor(private route: ActivatedRoute, private router: Router, private phaseService : PhaseService, private location: Location) {
    // this.phaseId = +params.get('id')

    this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(phase => {
      this.phase = phase;
    });

    this.route.paramMap
    .switchMap((params: ParamMap) => this.phaseService.getApplicantsToApprove(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(aplicants => {
      console.log(aplicants)
      this.aplicants = aplicants;
    });

  }

  ngOnInit() {
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  goBack(): void {
    this.location.back();
  }

  closeModalUpdatePhase(){
    //TODO: implementada por que en el HTML se hace referencia, debe estar?
  }

}
