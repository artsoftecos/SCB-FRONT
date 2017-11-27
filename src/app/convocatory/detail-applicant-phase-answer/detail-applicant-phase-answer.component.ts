import { Component, OnInit, Input } from '@angular/core';
import { ApplicantPhaseService } from '../../services/applicant-phase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-applicant-phase-answer',
  templateUrl: './detail-applicant-phase-answer.component.html',
  styleUrls: ['./detail-applicant-phase-answer.component.css']
})
export class DetailApplicantPhaseAnswerComponent implements OnInit {

  public answers: Array<Object> = [];
  public applicant: any = null;
  public appPhaseId: number;
  @Input() convocatoryId: number;
  @Input() phaseId: number;

  constructor(private service: ApplicantPhaseService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.appPhaseId = +params['id'];
      if (isNaN(this.appPhaseId))
        this.appPhaseId = 31;

      this.loadAnswers();
    });
  }

  ngOnChanges() {
    this.loadAnswers()
  }

  loadAnswers() {
    this.service.getAppPhase(this.phaseId).subscribe(response => {
      this.applicant = response.applicant;
      this.buildAnswers(response.answers);
    });
  }

  buildAnswers(answers) {
    this.answers = []
    var ans = JSON.parse(answers);
    console.log(ans);

    for (var answer in ans) {
      var field = {
        "id": answer,
        "value": ans[answer].value,
        "label": ans[answer].label,
        "fieldTypeId": ans[answer].fieldTypeId
      }
      this.answers.push(field);
    }
  }

  downloadFile(name) {
    //this.convocatoryId = 15;
    //this.phaseId = 31;
    this.service.downloadFile(this.convocatoryId, this.phaseId, this.applicant.email, name)
      .subscribe(response => {
        console.log(response);
        /*var blob = new Blob([response]);
        var url = window.URL.createObjectURL(blob);
        window.open(url);*/
      });
  }

  approvedApplicant(){
    console.log("Aprobar");
  }

  denyApplicant(){
    console.log("Rechazar");
  }

}
