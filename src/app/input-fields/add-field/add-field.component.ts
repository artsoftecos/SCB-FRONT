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
import { FieldTypeValidationService } from '../../services/field-type-validation.service'


@Component({
  selector: 'add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  providers: [InputFieldsService, FieldTypeService, FieldTypeValidationService]
})
export class AddFieldComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();
  modal_height = 40;

  @Input() create: boolean;
  @Input() edit: boolean;
  @Input() idPhase: string;
  @Input() order: number;

  @Input() fieldInstance: FieldModel;

  @Output() created: EventEmitter<FieldModel> = new EventEmitter<FieldModel>();
  @Output() deleted: EventEmitter<FieldModel> = new EventEmitter<FieldModel>();


  loadFieldTypes() {
    this.fieldTypeService.get().subscribe(fieldTypes => {
      let field = {};
      field['id'] = "0";
      field['nombre'] = "Seleccione tipo de campo";
      this.fieldInstance.selectOptions = fieldTypes;
      this.fieldInstance.selectOptions.unshift(field);
    },
      err => {
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
    private http: Http, private fieldTypeService: FieldTypeService,
    private fieldTypeValidationService: FieldTypeValidationService) {
    this.idPhase = "";
    this.create = true;
    this.edit = false;
    this.fieldInstance = new FieldModel(this.idPhase);

    this.loadFieldTypes();
  }

  ngOnInit() {
  }

  numberValidationTypeChange() {
    if (this.fieldInstance.type != "0") {
      this.fieldTypeValidationService.get(this.fieldInstance.type).subscribe(fieldTypesValidations => {
        this.fieldInstance.selectedValidation = {}
        if (this.fieldInstance.type == "3") {
          this.fieldInstance.validationOptions = fieldTypesValidations;
          this.fieldInstance.selectedValidation = fieldTypesValidations[0];
          let tipos = this.fieldInstance.selectedValidation['validationType']['expression'].split(",");
          for (var i = 0; i < tipos.length; i++) {
            this.fieldInstance.fileTypes.push({ 'name': tipos[i], 'checked': tipos[i] + "isChecked", 'value': false });
          }
          this.fieldInstance.selectedValidation = fieldTypesValidations[0]['id'];
        } else {

          if (this.fieldInstance.type == "6") {
            this.fieldInstance.validationOptions = fieldTypesValidations;
            this.fieldInstance.selectedValidation = fieldTypesValidations[0]['id'];
          } else {

            if (this.fieldInstance.type == "7") {
              this.fieldInstance.validationOptions = fieldTypesValidations;
              this.fieldInstance.selectedValidation = fieldTypesValidations[0]['id'];
            } else {
              let field = {};
              field['id'] = "0";
              field['validationType'] = {}
              field['validationType']['name'] = "Seleccione una validacion";
              this.fieldInstance.validationOptions = fieldTypesValidations;
              this.fieldInstance.validationOptions.unshift(field);
            }
          }
        }
      },
        err => {
          swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
        });
    }
  }

  deleteField() {

    this.inputFieldService.delete(this.fieldInstance.idField).subscribe(response => {
      this.deleted.emit(this.fieldInstance);
    },
      err => {
        swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
      });
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  addOption() {
    if (this.fieldInstance.optionValue.trim() != "") {
      this.fieldInstance.addedOptions.push(this.fieldInstance.optionValue);
    }
  }

  removeOption(index) {
    this.fieldInstance.addedOptions.splice(index, 1);
  }

  addField() {
    let fieldStructure = this.createFieldStructure();
    if ('error' in fieldStructure) {
      if (typeof (fieldStructure['error']) == "string") {
        swal('Oops...', fieldStructure['error'], 'error').catch(swal.noop);
      }
    } else {
      this.inputFieldService.post(this.fieldInstance).subscribe(response => {
        this.closeModal();
        this.created.emit(this.fieldInstance);
        return this.fieldInstance;
      },
        err => {
          swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
        });

    }
  }

  getTypeName() {
    let typeId = this.fieldInstance.type;
    for (var i = 0; i < this.fieldInstance.selectOptions.length; i++) {
      if (typeId == this.fieldInstance.selectOptions[i]['id']) {
        this.fieldInstance.selectedOptionName = this.fieldInstance.selectOptions[i].name;
      }
    }
  }

  createFieldStructure() {
    this.fieldStructure = {};

    if (this.fieldInstance.type == "0") {
      return { 'error': 'Debe seleccionar un tipo de campo!' }
    }

    this.getTypeName();
    if (this.fieldInstance.name.trim() == "") {
      this.fieldInstance.nameTooltip = [];
      this.fieldInstance.nameTooltip['error'] = "Este campo es obligatorio";
      return { 'error': true }
    } else {
      this.fieldInstance.nameTooltip = undefined;
    }

    this.fieldStructure['idPhase'] = this.idPhase;
    this.fieldStructure['name'] = this.fieldInstance.name;
    this.fieldStructure['obligatory'] = this.fieldInstance.obligatory;
    this.fieldStructure['order'] = this.order;
    this.fieldStructure['value'] = "";
    this.fieldStructure['fieldType'] = { 'id': this.fieldInstance.type };

    this.fieldStructure['validation'] = {};

    // if(typeof(this.fieldInstance.selectedValidation) == "object")
    //   this.fieldStructure['validation']['id'] = this.fieldInstance.selectedValidation['id'];
    // else
    //   this.fieldStructure['validation']['id'] = this.fieldInstance.selectedValidation;
    this.fieldStructure['validation']['errorMessage'] = this.fieldInstance.errorMessage;
    this.fieldStructure['validation']['fieldTypeValidation'] = { 'id': this.fieldInstance.selectedValidation };

    if (this.fieldInstance.selectedValidation == "3" || this.fieldInstance.selectedValidation == "1") {
      if (this.fieldInstance.validateMinLen > this.fieldInstance.validateMaxLen) {
        this.fieldInstance.validateMinLenTooltip = [];
        this.fieldInstance.validateMinLenTooltip['error'] = "Este campo debe ser menor al maximo";
        this.fieldInstance.validateMaxLenTooltip = [];
        this.fieldInstance.validateMaxLenTooltip['error'] = "Este campo debe ser mayor al minimo";
        return {
          'error': true
        }
      }
      this.fieldStructure['validation']['value'] = this.fieldInstance.validateMinLen + "|" + this.fieldInstance.validateMaxLen;
    } else {
      if (this.fieldInstance.type == "4") {
        this.fieldStructure['validation']['value'] = "";
        for (var i = 0; i < this.fieldInstance.fileTypes.length; i++) {
          if (this.fieldInstance.fileTypes[i]['value']) {
            this.fieldStructure['validation']['value'] = this.fieldInstance.fileTypes[i] + ",";
          }
        }
      } else {
        if (this.fieldInstance.type == "5") {
          this.fieldStructure['validation']['value'] = this.fieldInstance.minDate;
        } else {
          if (this.fieldInstance.type == "6") {
            this.fieldStructure['validation']['value'] = this.fieldInstance.maxDate;
          } else {
            if (this.fieldInstance.type == "7") {

              if (this.fieldInstance.maxDate < this.fieldInstance.minDate) {
                this.fieldInstance.minDateTooltip = [];
                this.fieldInstance.minDateTooltip['error'] = "Esta fecha debe ser menor a la maxima";
                this.fieldInstance.maxDateTooltip = [];
                this.fieldInstance.maxDateTooltip['error'] = "Esta fecha debe ser mayor a la minima";
                return {
                  'error': 'La fecha inicial debe ser menor a la fecha final!'
                }
              }
              this.fieldStructure['validation']['value'] = this.fieldInstance.minDate + "|" + this.fieldInstance.maxDate;
            } else {
              if (this.fieldInstance.type == "8") {
                this.fieldStructure['validation']['value'] = this.fieldInstance.numberMoreThan;
              } else {
                if (this.fieldInstance.type == "9") {
                  this.fieldStructure['validation']['value'] = this.fieldInstance.numberLessThan;
                } else {
                  if (this.fieldInstance.type == "10") {
                    if (this.fieldInstance.numberLessThan > this.fieldInstance.numberMoreThan) {
                      this.fieldInstance.numberLessThanTooltip = [];
                      this.fieldInstance.numberLessThanTooltip['error'] = "Este campo debe ser menor al maximo";
                      this.fieldInstance.numberMoreThanTooltip = [];
                      this.fieldInstance.numberMoreThanTooltip['error'] = "Este campo debe ser mayor al minimo";
                      return {
                        'error': true
                      }
                    }
                    this.fieldStructure['validation']['value'] = this.fieldInstance.numberLessThan + "|" + this.fieldInstance.numberMoreThan;
                  } else {
                    if (this.fieldInstance.type == "11") {
                      this.fieldStructure['validation']['value'] = this.fieldInstance.emailRegularExpression;
                    } else {
                      if (this.fieldInstance.type == "12") {
                        this.fieldStructure['validation']['value'] = this.fieldInstance.urlRegularExpressionTooltip;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    this.fieldInstance.fieldStructure = this.fieldStructure;
    return this.fieldStructure;
  }
}