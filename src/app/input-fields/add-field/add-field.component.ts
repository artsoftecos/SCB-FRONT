import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { DatepickerOptions } from 'ng2-datepicker';
import * as es from 'date-fns/locale/es/index';
import swal from 'sweetalert2';
// import * as moment from 'moment';

@Component({
  selector: 'add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  modal_height = 40;

  // Campos basicos
  isRequired = false;
  selectedField = "0";
  fieldName = "";
  fieldNameTooltip = undefined;

  iconSelected = "";

  // Opciones de tipos
  selectOptions = [
    {value:1,name:"Texto corto",icon:"fa fa-minus"},
    {value:2,name:"Texto largo",icon:"fa fa-bars"},
    {value:3,name:"Unica opcion",icon:"fa fa-check-circle-o"},
    {value:4,name:"Multiples opciones",icon:"fa fa-check-square-o"},
    {value:5,name:"Archivo",icon:"fa fa-file"},
    {value:6,name:"Fecha",icon:"fa fa-calendar"},
    {value:7,name:"Numerico",icon:"fa fa-hashtag"},
    {value:8,name:"Email",icon:"fa fa-at"},
  ];

  // Validacion de longitud de textos
  validateMinLen = 0;
  validateMaxLen = 15;
  validateMinLenTooltip = undefined;
  validateMaxLenTooltip = undefined;

  // Opciones para campos (radio y checkbox)
  optionValue = "";
  addedOptions = []

  // Opciones para tipos de archivos
  fileTypes = [
    {name:"JPG", checked:"JPGisChecked", value:false},
    {name:"PDF", checked:"PDFisChecked", value:false},
    {name:"PNG", checked:"PNGisChecked", value:false},
    {name:"word", checked:"wordisChecked", value:false},
    {name:"excel", checked:"excelisChecked", value:false},
    {name:"powerpoint", checked:"powerpointisChecked", value:false},
  ];

  // Opciones para validacion de dfechas
  dateValidationTypeOptions = [
    {value:0,name:"Sin validacion"},
    {value:1,name:"Menor que"},
    {value:2,name:"Mayor que"},
    {value:3,name:"Entre"},
  ];
  dateValidationType = 0;

  // Validacion de fechas
  minDate: Date;
  maxDate: Date;
  minDateTooltip = undefined;
  maxDateTooltip = undefined;

  // Opciones para validacion de numeros
  numberValidationTypeOptions = [
    {value:0,name:"Sin validacion"},
    {value:1,name:"Menor que"},
    {value:2,name:"Mayor que"},
    {value:3,name:"Entre"},
    {value:4,name:"Telefono"},
  ];
  numberValidationType = 0;
  numberLessThan = 0;
  numberMoreThan = 0;
  numberLessThanTooltip = undefined;
  numberMoreThanTooltip = undefined;


  // @ViewChild('fieldName') fieldNameElement:ElementRef; 
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
    //locale: 'es',
  };

  
  fullImagePath: string;

  constructor() { 
    this.minDate = new Date();
    this.maxDate = new Date();
    this.fullImagePath = environment.ClientUrl + '/assets/img/img1.jpg';
  }

  ngOnInit() {
  }

  numberValidationTypeChange(value) {
    if(value != "0"){
      this.iconSelected = this.selectOptions[parseInt(value)-1].icon;
    }
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  addOption(){
    // var inputValue = (<HTMLInputElement>document.getElementById("input_opcion")).value;
    if(this.optionValue.trim() != ""){
      this.addedOptions.push(this.optionValue);
    }
  }

  removeOption(index){
    this.addedOptions.splice(index, 1);
  }

  addField(){
    let fieldStructure = this.createFieldStructure();
    console.log(fieldStructure)
    if('error' in fieldStructure){
      if(typeof(fieldStructure['error']) == "string"){
        swal('Oops...', fieldStructure['error'], 'error').catch(swal.noop);
      }
    }else{
      this.closeModal();
      return fieldStructure;
    }
  }

  createFieldStructure(){
    let fieldStructure = {};

    if(this.selectedField == "0"){
      return {'error': 'Debe seleccionar un tipo de campo!'}
    }

    if(this.fieldName.trim() == ""){
      this.fieldNameTooltip = [];
      this.fieldNameTooltip['error'] = "Este campo es obligatorio";
      return {'error': true}
    }else{
      this.fieldNameTooltip = undefined;
    }

    fieldStructure['field_type_id'] = this.selectedField;
    fieldStructure['field_name'] = this.fieldName;
    fieldStructure['is_required'] = this.isRequired;

    if(this.selectedField == "1" || this.selectedField == "2"){
      if(this.validateMinLen > this.validateMaxLen){
        this.validateMinLenTooltip = [];
        this.validateMinLenTooltip['error'] = "Este campo debe ser menor al maximo";
        this.validateMaxLenTooltip = [];
        this.validateMaxLenTooltip['error'] = "Este campo debe ser mayor al minimo";
        return {
          'error': true
        }
      }
      fieldStructure['validation'] = {};
      fieldStructure['validation']['min_len'] = this.validateMinLen;
      fieldStructure['validation']['max_len'] = this.validateMaxLen;
    }else{
      if(this.selectedField == "3" || this.selectedField == "4"){
        if(this.addedOptions.length < 2){
          return {'error': 'Debe agregar al menos 2 opciones al campo'}
        }
        fieldStructure['options'] = {};
        for(var i = 0; i < this.addedOptions.length; i++){
          fieldStructure['options'][i] = {}
          fieldStructure['options'][i]['id'] = i;
          fieldStructure['options'][i]['name'] = this.addedOptions[i];
        }
      }else{
        if(this.selectedField == "5"){
          fieldStructure['format'] = {};
          for(var i = 0; i < this.fileTypes.length; i++){
            if(this.fileTypes[i]['value']){
              fieldStructure['format'][i] = {}
              fieldStructure['format'][i]['id'] = i;
              fieldStructure['format'][i]['name'] = this.fileTypes[i];
            }
          }
        }else{
          if(this.selectedField == "6"){
            fieldStructure['validation'] = {};
            if(this.dateValidationType == 1)
              fieldStructure['validation']['min_date'] = this.minDate;
            if(this.dateValidationType == 2)
              fieldStructure['validation']['max_date'] = this.maxDate;
            if(this.dateValidationType == 3){
              if(this.maxDate < this.minDate){
                this.minDateTooltip = [];
                this.minDateTooltip['error'] = "Esta fecha debe ser menor a la maxima";
                this.maxDateTooltip = [];
                this.maxDateTooltip['error'] = "Esta fecha debe ser mayor a la minima";
                return {
                  'error': 'La fecha inicial debe ser menor a la fecha final!'
                }
              }
              fieldStructure['validation']['min_date'] = this.minDate;
              fieldStructure['validation']['max_date'] = this.maxDate;
            }
          }else{
            if(this.selectedField == "7"){
              if(this.numberValidationType == 1)
                fieldStructure['validation']['number_less_than'] = this.numberLessThan;
              if(this.numberValidationType == 2)
                fieldStructure['validation']['number_more_than'] = this.numberMoreThan;
              if(this.numberValidationType == 3){
                if(this.numberLessThan > this.numberMoreThan){
                  this.numberLessThanTooltip = [];
                  this.numberLessThanTooltip['error'] = "Este campo debe ser menor al maximo";
                  this.numberMoreThanTooltip = [];
                  this.numberMoreThanTooltip['error'] = "Este campo debe ser mayor al minimo";
                  return {
                    'error': true
                  }
                }
                fieldStructure['validation']['number_less_than'] = this.numberLessThan;
                fieldStructure['validation']['number_more_than'] = this.numberMoreThan;
              }
            }
          }
        }
      }
    }
    
    return fieldStructure;
  }
}