import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Phase } from '../../../models/phase'
import { PhaseService } from '../../../services/phase-service'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.css']
})
export class EditPhaseComponent implements OnInit {

  @Input()
  phase: Phase;
  
  originalName: string;
  originalDescription: string;    
  originalStartDate: string;
  originalFinishDate: string;
  originalStartApprovalPostulation: string;    
  summary: string = "";

  //Tooltips
  name_tooltip = undefined;
  description_tooltip = undefined;
  startDate_tooltip = undefined;
  finishDate_tooltip = undefined;
  startApprovalPostulation_tooltip = undefined;
  resultDate_tooltip = undefined;

  @Output()
  cancelation = new EventEmitter();

  constructor(private phaseService: PhaseService) { }

  ngOnInit() {
    this.originalName = this.phase.name;
    this.originalDescription = this.phase.description;    
    this.originalStartDate = this.phase.startDate;
    this.originalFinishDate = this.phase.finishDate;
    this.originalStartApprovalPostulation = this.phase.startApprovalPostulation;
  }

  ngAfterViewInit() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  updatePhase() {
    this.cleanSummay();
    if (!this.isValidPhase()) {
      swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      return;
    }
    this.phaseService.put(this.phase).subscribe(response => {
      this.phase = new Phase();
      swal('Exito!', 'Se ha actualizado la fase satisfactoriamente', 'success').catch(swal.noop);
      this.cancelUpdatePhase();
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

  isValidPhase(): boolean {
    let isValid = true;
    try {
      if (this.phase.name === undefined || this.phase.name === "") {
        this.name_tooltip = [];
        this.name_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      if (this.phase.startDate === undefined || this.phase.startDate.toString() === "") {
        this.startDate_tooltip = [];
        this.startDate_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      if (this.phase.finishDate === undefined || this.phase.finishDate.toString() === "") {
        this.finishDate_tooltip = [];
        this.finishDate_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      if (this.phase.startApprovalPostulation === undefined || this.phase.startApprovalPostulation.toString() === "") {
        this.startApprovalPostulation_tooltip = [];
        this.startApprovalPostulation_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      /*if (this.phase.resultDate === undefined || this.phase.resultDate.toString() === "") {
        this.resultDate_tooltip = [];
        this.resultDate_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }*/

      if (!isValid) {
        return false;
      }
      isValid = this.ValidateDates();
    }
    catch (e) {
      swal('Oops...', (<Error>e).message, 'error').catch(swal.noop);
      return false;
    }
    return isValid;
  };

  private ValidateDates(): boolean {
    var isValid = true;
    var today = new Date();
    var startDate = new Date(this.phase.startDate);

    if (startDate < today) {
      this.startDate_tooltip = [];
      this.startDate_tooltip['error'] = "Fecha de inicio no puede ser menor a hoy.";
      isValid = false;
    }

    var finishDate = new Date(this.phase.finishDate);
    if (finishDate < today) {
      this.finishDate_tooltip = [];
      this.finishDate_tooltip['error'] = "Fecha de fin no puede ser menor a hoy.";
      isValid = false;
    } else if (finishDate < startDate) {
      this.finishDate_tooltip = [];
      this.finishDate_tooltip['error'] = "Fecha de fin no puede ser menor a la fecha de inicio.";
      isValid = false;
    }

    var startApprovalPostulation = new Date(this.phase.startApprovalPostulation);
    if (startApprovalPostulation < startDate) {
      this.startApprovalPostulation_tooltip = [];
      this.startApprovalPostulation_tooltip['error'] = "Fecha de inicio de aprobación no puede ser menor a la fecha de inicio.";
      isValid = false;
    } else if (startApprovalPostulation > finishDate) {
      this.startApprovalPostulation_tooltip = [];
      this.startApprovalPostulation_tooltip['error'] = "Fecha de inicio de aprobación no puede ser mayor a la fecha fin.";
      isValid = false;
    }

    /* var resultDate = new Date(this.phase.resultDate);
     if (resultDate < finishDate) {
      this.resultDate_tooltip = [];
      this.resultDate_tooltip['error'] = "Fecha de resultados no puede ser menor a la fecha de fin.";
      isValid = false;
    }*/
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
            break;
          }
          case "description": {
            this.description_tooltip = [];
            this.description_tooltip['error'] = errors[variable];
            break;
          }
          case "startDate": {
            this.startDate_tooltip = [];
            this.startDate_tooltip['error'] = errors[variable];
            break;
          }
          case "finishDate": {
            this.finishDate_tooltip = [];
            this.finishDate_tooltip['error'] = errors[variable];
            break;
          }
          case "startApprovalPostulation": {
            this.startApprovalPostulation_tooltip = [];
            this.startApprovalPostulation_tooltip['error'] = errors[variable];
            break;
          }
          /*case "resultDate": {
            this.resultDate_tooltip = [];
            this.resultDate_tooltip['error'] = errors[variable];
            break;
          }*/
        }
        var att = document.createAttribute("data-tooltip");
        att.value = errors[variable];
        var elementToMap = document.getElementById(variable);
        if (elementToMap !== undefined) {
          document.getElementById(variable).setAttributeNode(att);
          document.getElementById(variable).classList.add("invalid");
        }
      }
    }
  }

  cancelUpdatePhase() {

    this.phase.name = this.originalName;
    this.phase.description = this.originalDescription;
    this.phase.startDate = this.originalStartDate;
    this.phase.finishDate = this.originalFinishDate;
    this.phase.startApprovalPostulation = this.originalStartApprovalPostulation;

    this.cleanSummay(); 
    this.cancelation.emit();
  }

  cleanSummay() {
    this.summary = "";
  }
}
