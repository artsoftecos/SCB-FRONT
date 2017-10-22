import { Component, OnInit, Input } from '@angular/core';
import { PhaseService } from '../../../services/phase-service';
import { Applicant } from '../../../models/applicant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-applicant-to-approve-phase',
  templateUrl: './applicant-to-approve-phase.component.html',
  styleUrls: ['./applicant-to-approve-phase.component.css']
})
export class ApplicantToApprovePhaseComponent implements OnInit {

  public applicants: any = [];

  @Input()
  phaseId: number;

  constructor(private router: Router, private phaseService : PhaseService) { }

  ngOnInit() {
    this.loadApplicantsToApprovePhase();
  }

 loadApplicantsToApprovePhase() {
    this.phaseService.getApplicantsToApprove(this.phaseId).subscribe(applicants => {
      this.applicants = applicants;
    });
  }

  approve(applicantId: number) {
     
  }

  reject(applicantId: number) {
    
  }
  
}
