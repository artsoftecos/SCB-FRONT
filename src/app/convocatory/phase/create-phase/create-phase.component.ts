import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Phase } from '../../../models/phase'
import { PhaseService } from '../../../services/phase-service'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-phase',
  templateUrl: './create-phase.component.html',
  styleUrls: ['./create-phase.component.css']
})
export class CreatePhaseComponent implements OnInit {
  phase: Phase = new Phase();

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

  registerPhase() {  
    if (!this.isValidPhase()) {
      swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      return;
    }
    this.phaseService.post(this.phase).subscribe(response => {
      this.phase = new Phase();      
      swal('Exito!', 'Se ha creado la fase satisfactoriamente', 'success').catch(swal.noop);
      this.cancelRegisterPhase();
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
      if (this.phase.name === undefined ||this.phase.name === "") {
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

      if (this.phase.resultDate === undefined || this.phase.resultDate.toString() === "") {
        this.resultDate_tooltip = [];
        this.resultDate_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }
    }
    catch (e) {
      swal('Oops...', (<Error>e).message, 'error').catch(swal.noop);
      return false;
    }
    return isValid;
  };

  handleUiErrors(err: any) {
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
          case "resultDate": {
            this.resultDate_tooltip = [];
            this.resultDate_tooltip['error'] = errors[variable];
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

  cancelRegisterPhase() {
    this.cancelation.emit();
  }
}



