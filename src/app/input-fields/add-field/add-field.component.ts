import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { DatepickerOptions } from 'ng2-datepicker';
import * as es from 'date-fns/locale/es/index';
import swal from 'sweetalert2';
import { FieldModel } from '../../models/field.model';
import { InputFieldsService } from '../../services/input-fields.service';
import { Http } from '@angular/http';
import { FieldTypeService } from '../../services/field-type.service'
import { FieldType } from '../../models/field-type.model'

@Component({
  selector: 'add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  providers: [InputFieldsService, FieldTypeService]
})
export class AddFieldComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  modal_height = 40;

  @Input() create: boolean;
  @Input() edit: boolean;
  @Input() idPhase: string;

  @Input() fieldInstance: FieldModel;
 
  @Output() created: EventEmitter<FieldModel> = new EventEmitter<FieldModel>();
  @Output() deleted: EventEmitter<FieldModel> = new EventEmitter<FieldModel>();

  
  loadFieldTypes() {
    this.fieldTypeService.get().subscribe(fieldTypes => {
      this.fieldInstance.selectOptions = fieldTypes;
    },
    err => {
      console.log(err);
      console.log(err.json());
      swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
    });
  }
  
  // Dict resultado
  fieldStructure = {};
 
 options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
    //locale: 'es',
  };

  constructor(private inputFieldService: InputFieldsService,
    private http: Http, private fieldTypeService: FieldTypeService) { 
    this.idPhase = "";
    this.create = true;
    this.edit = false;
    this.fieldInstance = new FieldModel(this.idPhase);

    this.loadFieldTypes();
  }

  ngOnInit() {
  }

  numberValidationTypeChange() {
    if(this.fieldInstance.type != "0"){
      this.fieldInstance.iconSelected = this.fieldInstance.selectOptions[parseInt(this.fieldInstance.type)-1].icon;
      console.log("ICONO "+this.fieldInstance.iconSelected)
    }
  }

  deleteField(){
    this.deleted.emit(this.fieldInstance);
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
    console.log(this.fieldStructure)
    if('error' in fieldStructure){
      if(typeof(fieldStructure['error']) == "string"){
        swal('Oops...', fieldStructure['error'], 'error').catch(swal.noop);
      }
    }else{
      // console.log("POST")
      // console.log(this.fieldInstance)
      // this.inputFieldService.post(this.fieldInstance).subscribe(response => {
      //   console.log("exito")
      //   /* this.convocatory = new Convocatory();
      //   this.selectedType = -1;
      //   swal('Exito!', 'Se ha creado la convocatoria satisfactoriamente', 'success').catch(swal.noop);
      //   this.cancelRegisterConvocatory(); */
      // },
      // err => {
      //   console.log("error:");
      //   console.log(err);
      //   console.log(err.status);
      //   console.log(err.json());
      //   if (err.status == 400) {
      //     swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
      //   } else {
      //     // this.handleUiErrors(err);
      //     swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      //   }
      // });

      this.closeModal();
      this.created.emit(this.fieldInstance);
      return this.fieldInstance;
    }
  }

  getTypeName(){
    let typeId = this.fieldInstance.type;
    for(var i = 0; i < this.fieldInstance.selectOptions.length; i++){
      if(typeId == this.fieldInstance.selectOptions[i]['id']){
        this.fieldInstance.selectedOptionName = this.fieldInstance.selectOptions[i].name;
      }
    }
  }

  createFieldStructure(){
    this.fieldStructure = {};

    if(this.fieldInstance.type == "0"){
      return {'error': 'Debe seleccionar un tipo de campo!'}
    }

    this.getTypeName();
    if(this.fieldInstance.name.trim() == ""){
      this.fieldInstance.nameTooltip = [];
      this.fieldInstance.nameTooltip['error'] = "Este campo es obligatorio";
      return {'error': true}
    }else{
      this.fieldInstance.nameTooltip = undefined;
    }

    this.fieldStructure['field_type_id'] = this.fieldInstance.type;
    this.fieldStructure['name'] = this.fieldInstance.name;
    this.fieldStructure['obligatory'] = this.fieldInstance.obligatory;

    if(this.fieldInstance.type == "1" || this.fieldInstance.type == "2"){
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
      if(this.fieldInstance.type == "3" || this.fieldInstance.type == "4"){
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
        if(this.fieldInstance.type == "5"){
          this.fieldStructure['format'] = {};
          for(var i = 0; i < this.fieldInstance.fileTypes.length; i++){
            if(this.fieldInstance.fileTypes[i]['value']){
              this.fieldStructure['format'][i] = {}
              this.fieldStructure['format'][i]['id'] = i;
              this.fieldStructure['format'][i]['name'] = this.fieldInstance.fileTypes[i];
            }
          }
        }else{
          if(this.fieldInstance.type == "6"){
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
            if(this.fieldInstance.type == "7"){
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