import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Convocatory } from '../../models/convocatory'
import { ConvocatoryType } from '../../models/convocatory-type'
import { ConvocatoryTypeService } from '../../services/convocatory-type.service'
import { ConvocatoryService } from '../../services/convocatory.service'
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Oferrer } from '../../models/oferrer';
import { HelperService } from '../../services/helper.service';
import swal from 'sweetalert2';
//import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-create-convocatory',
  templateUrl: './create-convocatory.component.html',
  styleUrls: ['./create-convocatory.component.css']
})
export class CreateConvocatoryComponent implements OnInit {
  convocatory: Convocatory = new Convocatory();
  convocatoryTypes: ConvocatoryType[];
  selectedType: number;
  summary: string = "";

  //Tooltips
  name_tooltip = undefined;
  numberBeneficiaries_tooltip = undefined;
  description_tooltip = undefined;
  type_tooltip = undefined;
  resultDate_tooltip = undefined;

  @Output()
  cancelation = new EventEmitter();

  constructor(private convocatoryTypeService: ConvocatoryTypeService,
    private convocatoryService: ConvocatoryService,
    private authService: AuthService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.loadConvocatoryTypes();
  }

  loadConvocatoryTypes() {
    this.convocatoryTypeService.get().subscribe(convocatoryTypes => {
      let conv = new ConvocatoryType();
      conv.id = -1;
      conv.name = "Seleccione tipo de convocatoria";      
      this.convocatoryTypes=convocatoryTypes;
      this.convocatoryTypes.unshift(conv);
    },
      err => {
        console.log(err);
        console.log(err.json());
        swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
      });
  }

 /* options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
  };*/

  registerConvocatory() {
    this.cleanSummay();
    let type = new ConvocatoryType();
    type.id = this.selectedType;
    this.convocatory.convocatoryType = type;
    let user = this.authService.getCurrentUser();
    let oferrer= new Oferrer();
    oferrer.email = user.email;
    this.convocatory.offerer = oferrer;
    if (!this.isValidConvocatory()) {
      swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      return;
    }
    let date = this.helperService.dmyToDate(this.convocatory.resultDate);
    //"17/9/2014".toDate("dd/MM/yyyy", "/")
    //let date = new Date(this.convocatory.resultDate);
    this.convocatory.resultDate = this.helperService.getDateFormatYYYYMMddDash(date);
    console.log(this.convocatory.resultDate);
    this.convocatoryService.post(this.convocatory).subscribe(response => {
      this.convocatory = new Convocatory();
      this.selectedType = -1;
      swal('Exito!', 'Se ha creado la convocatoria satisfactoriamente', 'success').catch(swal.noop);
      this.cancelRegisterConvocatory();
    },
      err => {
        console.log("error:");
        console.log(err);
        console.log(err.status);
        console.log(err.json());
        if (err.status == 400) {
          swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
        } else {
          this.handleUiErrors(err);
          swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
        }
      });
  };

  isValidConvocatory(): boolean {
    let isValid = true;
    var today = new Date();
    
    try {
      if (this.convocatory.name === undefined ||this.convocatory.name === "") {
        this.name_tooltip = [];
        this.name_tooltip['error'] = "Este campo es obligatorio";
        this.summary += "El nombre es requerido.<br/>";
        isValid = false;
      }

      if (this.convocatory.numberBeneficiaries === undefined || this.convocatory.numberBeneficiaries === null || this.convocatory.numberBeneficiaries.toString() === "") {
        this.numberBeneficiaries_tooltip = [];
        this.numberBeneficiaries_tooltip['error'] = "Este campo es obligatorio";
        this.summary += "El número de plazas es obligatorio.<br/>";
        isValid = false;
      }

      if (this.convocatory.numberBeneficiaries !== undefined && this.convocatory.numberBeneficiaries !== null && this.convocatory.numberBeneficiaries <= 0) {
        this.numberBeneficiaries_tooltip = [];
        this.numberBeneficiaries_tooltip['error'] = "Las plazas deben ser mayores a 0";
        this.summary += "El número de plazas debe ser mayor a 0.<br/>";
        isValid = false;
      }

      if (this.convocatory.convocatoryType === undefined || this.convocatory.convocatoryType.id === undefined) {
        this.type_tooltip = [];
        this.type_tooltip['error'] = "Seleccione el tipo de convocatoria.";
        this.summary += "Seleccione el tipo de convocatoria.<br/>";
        isValid = false;
      }

      if (this.convocatory.offerer === undefined || this.convocatory.offerer === null) {
        this.type_tooltip = [];
        this.type_tooltip['error'] = "El oferente no puede ser nulo.";
        this.summary += "El oferente no puede ser nulo.<br/>";
        isValid = false;
      }

      var idsConvocatoryTypes = this.convocatoryTypes.map(function(a) {return a.id;});
      if (this.convocatory.convocatoryType !== undefined && this.convocatory.convocatoryType.id !== undefined 
          && idsConvocatoryTypes.indexOf(parseInt(this.convocatory.convocatoryType.id.toString())) == -1) {
        this.type_tooltip = [];
        this.type_tooltip['error'] = "El tipo de convocatoria no existe.";
        this.summary += "El tipo de convocatoria no existe.<br/>";
        isValid = false;
      }  
      
      if (this.convocatory.resultDate === undefined || this.convocatory.resultDate.toString() === "") {
        this.resultDate_tooltip = [];
        this.resultDate_tooltip['error'] = "Este campo es obligatorio";
        this.summary += "La fecha de resultados es obligatoria.<br/>";
        isValid = false;
      }
      
      if (this.convocatory.resultDate !== undefined && this.convocatory.resultDate !== null) {
          var resultDateWithGMT = new Date(this.convocatory.resultDate);
          var userTimezoneOffset = resultDateWithGMT.getTimezoneOffset() * 60000;
          var resultDate = new Date(resultDateWithGMT.getTime() + userTimezoneOffset);
          if (resultDate < today) {
          this.resultDate_tooltip = [];
          this.resultDate_tooltip['error'] = "Fecha de resultados no puede ser menor a hoy.";
          this.summary += "Fecha de resultados no puede ser menor a hoy.<br/>";
          isValid = false;
          }
      }
    }
    catch (e) {
      swal('Oops...', (<Error>e).message, 'error').catch(swal.noop);
      return false;
    }
    return isValid;
  };

  handleUiErrors(err: any) {  
    this.cleanSummay();  
    let errors = err.json();
    for (var variable in errors) {
      if (errors.hasOwnProperty(variable)) {
        var element = errors[variable];
        switch (variable) {
          case "name": {
            this.name_tooltip = [];
            this.name_tooltip['error'] = errors[variable];
            this.summary += errors[variable];
            break;
          }
          case "numberBeneficiaries": {
            this.numberBeneficiaries_tooltip = [];
            this.numberBeneficiaries_tooltip['error'] = errors[variable];
            this.summary += errors[variable];
            break;
          }
          case "description": {
            this.description_tooltip = [];
            this.description_tooltip['error'] = errors[variable];
            this.summary += errors[variable];
            break;
          }
          case "resultDate": {
            this.resultDate_tooltip = [];
            this.resultDate_tooltip['error'] = errors[variable];
            this.summary += errors[variable];
            break;
          }
          case "summary": {
            this.summary += errors[variable];
            break;
          }
        }
        var att = document.createAttribute("data-tooltip");
        att.value = errors[variable];
        var elementToMap = document.getElementById(variable);
        if (elementToMap !== undefined)
        {
          document.getElementById(variable).setAttributeNode(att);
          document.getElementById(variable).classList.add("invalid");
        }
      }
    }
  }

  cancelRegisterConvocatory() {
    this.convocatory = new Convocatory();
    this.cleanSummay();
    this.cancelation.emit();
  }

  cleanSummay() {
    this.summary = "";
  }
}


