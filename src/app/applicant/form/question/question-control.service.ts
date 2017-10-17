import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './fields/question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = this.setFormControl(question);
    });
    console.log(group);
    return new FormGroup(group);
  }

  private setFormControl(question) {
    let formControl;
    switch (question.controlType) {
      case 'email':
        formControl = new FormControl(question.value || '', this.emailValidations(question.required));
        break;
      case 'number':
        formControl = new FormControl(question.value || '', this.numberValidations(question.validation, question.required));
        break;
      default:
        formControl = new FormControl(question.value || '');
        break;
    }
    return formControl;
  }

  private emailValidations(required) {
    if (required)
      return Validators.compose([Validators.required, Validators.email]);
    return Validators.email;
  }

  private numberValidations(validation, required) {

    let validators = [];
    if (required)
      validators = [Validators.required];
    //  console.log(validation);
    if (validation)
      switch (validation.id) {
        case 1:
          //Mayor
          validators.push(Validators.min(validation.value));
          break;
        case 2:
          //Menor
          validators.push(Validators.max(validation.value));
          break;
        case 3:
          //Entre
          let values = validation.value.split("|");
          //        console.log(values);
          validators.push(Validators.max(values[1]));
          validators.push(Validators.min(values[0]));
          break;
        case 4:
          //Celular
          break;
      }

    return Validators.compose(validators);
  }
}
