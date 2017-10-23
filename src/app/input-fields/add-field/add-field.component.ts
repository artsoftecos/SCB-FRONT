import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { DatepickerOptions } from 'ng2-datepicker';
import * as es from 'date-fns/locale/es/index';
import swal from 'sweetalert2';
// import * as moment from 'moment';
import { FieldModel } from './field.model';

@Component({
  selector: 'add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  modal_height = 40;

  @Input() create: boolean;
  @Input() edit: boolean;

  @Input() fieldInstance: FieldModel;
 
  // modalActions = new EventEmitter<string|MaterializeAction>();
  @Output() created: EventEmitter<FieldModel> = new EventEmitter<FieldModel>();
  
  // Dict resultado
  fieldStructure = {};

  // fullImagePath: string;
 // @ViewChild('fieldName') fieldNameElement:ElementRef; 
  
 iconSelected = "";
 
 options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
    //locale: 'es',
  };

  constructor() { 
    this.create = true;
    this.edit = false;
    this.fieldInstance = new FieldModel();
    // this.fullImagePath = environment.ClientUrl + '/assets/img/img1.jpg';
  }

  ngOnInit() {
  }

  numberValidationTypeChange(value) {
    if(value != "0"){
      this.iconSelected = this.fieldInstance.selectOptions[parseInt(value)-1].icon;
    }
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  addOption(){
    if(this.fieldInstance.optionValue.trim() != ""){
      this.fieldInstance.addedOptions.push(this.fieldInstance.optionValue);
    }
  }

  removeOption(index){
    this.fieldInstance.addedOptions.splice(index, 1);
  }

  addField(){
    let fieldStructure = this.createFieldStructure();
    if('error' in fieldStructure){
      if(typeof(fieldStructure['error']) == "string"){
        swal('Oops...', fieldStructure['error'], 'error').catch(swal.noop);
      }
    }else{
      this.closeModal();
      this.created.emit(this.fieldInstance);
      return this.fieldInstance;
    }
  }

  getSelectedField(){
    let selectedFieldId = this.fieldInstance.selectedField;
    for(var i = 0; i < this.fieldInstance.selectOptions.length; i++){
      if(selectedFieldId == this.fieldInstance.selectOptions[i]['id']){
        this.fieldInstance.selectedOptionName = this.fieldInstance.selectOptions[i].name;
      }
    }
  }

  createFieldStructure(){
    this.fieldStructure = {};

    if(this.fieldInstance.selectedField == "0"){
      return {'error': 'Debe seleccionar un tipo de campo!'}
    }

    this.getSelectedField();
    if(this.fieldInstance.fieldName.trim() == ""){
      this.fieldInstance.fieldNameTooltip = [];
      this.fieldInstance.fieldNameTooltip['error'] = "Este campo es obligatorio";
      return {'error': true}
    }else{
      this.fieldInstance.fieldNameTooltip = undefined;
    }

    this.fieldStructure['field_type_id'] = this.fieldInstance.selectedField;
    this.fieldStructure['field_name'] = this.fieldInstance.fieldName;
    this.fieldStructure['is_required'] = this.fieldInstance.isRequired;

    if(this.fieldInstance.selectedField == "1" || this.fieldInstance.selectedField == "2"){
      if(this.fieldInstance.validateMinLen > this.fieldInstance.validateMaxLen){
        this.fieldInstance.validateMinLenTooltip = [];
        this.fieldInstance.validateMinLenTooltip['error'] = "Este campo debe ser menor al maximo";
        this.fieldInstance.validateMaxLenTooltip = [];
        this.fieldInstance.validateMaxLenTooltip['error'] = "Este campo debe ser mayor al minimo";
        return {
          'error': true
        }
      }
      this.fieldStructure['validation'] = {};
      this.fieldStructure['validation']['min_len'] = this.fieldInstance.validateMinLen;
      this.fieldStructure['validation']['max_len'] = this.fieldInstance.validateMaxLen;
    }else{
      if(this.fieldInstance.selectedField == "3" || this.fieldInstance.selectedField == "4"){
        if(this.fieldInstance.addedOptions.length < 2){
          return {'error': 'Debe agregar al menos 2 opciones al campo'}
        }
        this.fieldStructure['options'] = {};
        for(var i = 0; i < this.fieldInstance.addedOptions.length; i++){
          this.fieldStructure['options'][i] = {}
          this.fieldStructure['options'][i]['id'] = i;
          this.fieldStructure['options'][i]['name'] = this.fieldInstance.addedOptions[i];
        }
      }else{
        if(this.fieldInstance.selectedField == "5"){
          this.fieldStructure['format'] = {};
          for(var i = 0; i < this.fieldInstance.fileTypes.length; i++){
            if(this.fieldInstance.fileTypes[i]['value']){
              this.fieldStructure['format'][i] = {}
              this.fieldStructure['format'][i]['id'] = i;
              this.fieldStructure['format'][i]['name'] = this.fieldInstance.fileTypes[i];
            }
          }
        }else{
          if(this.fieldInstance.selectedField == "6"){
            this.fieldStructure['validation'] = {};
            if(this.fieldInstance.dateValidationType == 1)
              this.fieldStructure['validation']['min_date'] = this.fieldInstance.minDate;
            if(this.fieldInstance.dateValidationType == 2)
              this.fieldStructure['validation']['max_date'] = this.fieldInstance.maxDate;
            if(this.fieldInstance.dateValidationType == 3){
              if(this.fieldInstance.maxDate < this.fieldInstance.minDate){
                this.fieldInstance.minDateTooltip = [];
                this.fieldInstance.minDateTooltip['error'] = "Esta fecha debe ser menor a la maxima";
                this.fieldInstance.maxDateTooltip = [];
                this.fieldInstance.maxDateTooltip['error'] = "Esta fecha debe ser mayor a la minima";
                return {
                  'error': 'La fecha inicial debe ser menor a la fecha final!'
                }
              }
              this.fieldStructure['validation']['min_date'] = this.fieldInstance.minDate;
              this.fieldStructure['validation']['max_date'] = this.fieldInstance.maxDate;
            }
          }else{
            if(this.fieldInstance.selectedField == "7"){
              if(this.fieldInstance.numberValidationType == 1)
                this.fieldStructure['validation']['number_less_than'] = this.fieldInstance.numberLessThan;
              if(this.fieldInstance.numberValidationType == 2)
                this.fieldStructure['validation']['number_more_than'] = this.fieldInstance.numberMoreThan;
              if(this.fieldInstance.numberValidationType == 3){
                if(this.fieldInstance.numberLessThan > this.fieldInstance.numberMoreThan){
                  this.fieldInstance.numberLessThanTooltip = [];
                  this.fieldInstance.numberLessThanTooltip['error'] = "Este campo debe ser menor al maximo";
                  this.fieldInstance.numberMoreThanTooltip = [];
                  this.fieldInstance.numberMoreThanTooltip['error'] = "Este campo debe ser mayor al minimo";
                  return {
                    'error': true
                  }
                }
                this.fieldStructure['validation']['number_less_than'] = this.fieldInstance.numberLessThan;
                this.fieldStructure['validation']['number_more_than'] = this.fieldInstance.numberMoreThan;
              }
            }
          }
        }
      }
    }
    
    return this.fieldStructure;
  }
}