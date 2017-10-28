import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './fields/question-base';

@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() {
  //  console.log(this.form.controls[this.question.key].errors);
    return this.form.controls[this.question.key].valid;
  }
  get isRequired() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.required)
        return errors.required;
    return false;

  }
  get isNotBetween() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.dateNotBetween)
        return errors.dateNotBetween;
    return false;
  }

  get isDateLesser() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.dateLesser)
        return errors.dateLesser;
    return false;
  }

  get isDateGreater() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.dateGreater)
        return errors.dateGreater;
    return false;
  }

  get isMin() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.min)
        return errors.min;
    return false;
  }

  get isMax() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.max)
        return errors.max;
    return false;
  }

  get IsMinLength() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.minlength)
        return errors.minlength;
    return false;
  }

  get IsMaxLength() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.maxlength)
        return errors.maxlength;
    return false;
  }

  get IsEmail() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.email)
        return errors.email;
    return false;
  }

  get IsPattern() {
    var errors = this.form.controls[this.question.key].errors;
    if (errors)
      if (errors.pattern)
        return errors.pattern;
    return false;
  }

}
