import { Component, OnInit } from '@angular/core';

import { DropdownQuestion } from './question/fields/question-dropdown';
import { QuestionBase } from './question/fields/question-base';
import { TextboxQuestion } from './question/fields/question-textbox';
import { FileQuestion } from './question/fields/question-file';
import { TextareaQuestion } from './question/fields/question-textarea';
import { EmailQuestion } from './question/fields/question-email';
import { NumberQuestion } from './question/fields/question-number';
import { DateQuestion } from './question/fields/question-date';
import { UrlQuestion } from './question/fields/question-url';
import { TimeQuestion } from './question/fields/question-time';

import { QuestionService } from './question/question.service';
import { FieldService } from '../../services/field.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [QuestionService, FieldService]
})
export class FormComponent implements OnInit {

  public fields: any = [];
  public phaseId: number;

  constructor(private service: QuestionService, private fieldService: FieldService, private activatedRoute: ActivatedRoute) {
    //

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.phaseId = +params['id'];
      this.loadFields();
    });
  }

  loadFields() {

    var questions = this.fieldService.getFields(this.phaseId);
    //console.log(questions);
    //var questions = this.service.getQuestions(phaseId);
    this.fields = this.buildFields(questions);
  }

  buildFields(fields) {
    let questions: QuestionBase<any>[] = [];

    fields.forEach(element => {
      switch (element.field_type_id) {
        case 1:
          questions.push(new EmailQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 2:
          questions.push(new NumberQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 3:
          questions.push(new TextboxQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 4:
          questions.push(new TextareaQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 5:
          questions.push(new FileQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 6:
          questions.push(new DateQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 7:
          questions.push(new UrlQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;
        case 8:
          questions.push(new TimeQuestion({
            key: element.id,
            label: element.name,
            required: element.required,
            fieldTypeId: element.field_type_id,
            validation: element.validation
          }));
          break;

      }
    });
    return questions;
  }
}
