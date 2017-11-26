import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionBase } from './fields/question-base';
import { QuestionControlService } from './question-control.service';

import { PhaseService } from './../../../services/phase-service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() phaseId: number;
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService, private router: Router, private phaseService: PhaseService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    let response = this.buildResponse();
    //    this.payLoad = JSON.stringify(this.form.value);

    this.phaseService.applyToPhase(response)
      .subscribe(response => {
        swal('Exito!', 'Has aplicado satisfactoriamente a esta fase', 'success').catch(swal.noop);
        this.router.navigate(['/HomeApplicant/']);
      },
      (err) => {
        swal('Oops...', 'Algo salio mal, por favor vuelve a intentarlo', 'error').catch(swal.noop);
      });

  }

  private buildResponse() {

    var response = {
      "applicant": {
        "email": ''
      },
      "phase": {
        "id": this.phaseId
      },
      "answers": JSON.stringify(this.prepareAnswers())
    };

    return response;
  }

  private prepareAnswers() {
    var values = this.form.value;
    for (var i in values) {
      for (var j in this.questions) {
        console.log(this.questions[j], "Pregunta");
        if (this.questions[j].key == i) {
          values[i] = { "value": values[i], "fieldTypeId": this.questions[j].fieldTypeId }
        }
      }
    }
    return values;
  }

  
}
