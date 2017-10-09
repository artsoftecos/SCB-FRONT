import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Convocatory } from '../../models/convocatory'
import { ConvocatoryType } from '../../models/convocatory-type'
import { ConvocatoryTypeService } from '../../services/convocatory-type.service'
import { ConvocatoryService } from '../../services/convocatory.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-convocatory',
  templateUrl: './create-convocatory.component.html',
  styleUrls: ['./create-convocatory.component.css']
})
export class CreateConvocatoryComponent implements OnInit {
  convocatory: Convocatory = new Convocatory();
  convocatoryTypes: ConvocatoryType[];
  selectedType: number;

  //Tooltips
  name_tooltip = undefined;
  place_tooltip = undefined;
  description_tooltip = undefined;
  type_tooltip = undefined;

  @Output()
  cancelation = new EventEmitter();

  constructor(private convocatoryTypeService: ConvocatoryTypeService,
    private convocatoryService: ConvocatoryService) { }

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

  registerConvocatory() {
    let type = new ConvocatoryType();
    type.id = this.selectedType;
    this.convocatory.type = type;
    if (!this.isValidConvocatory()) {
      swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      return;
    }
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
    try {
      if (this.convocatory.name === undefined ||this.convocatory.name === "") {
        this.name_tooltip = [];
        this.name_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      if (this.convocatory.place === undefined || this.convocatory.place === null || this.convocatory.place.toString() === "") {
        this.place_tooltip = [];
        this.place_tooltip['error'] = "Este campo es obligatorio";
        isValid = false;
      }

      if (this.convocatory.place !== undefined && this.convocatory.place !== null && this.convocatory.place <= 0) {
        this.place_tooltip = [];
        this.place_tooltip['error'] = "Las plazas deben ser mayores a 0";
        isValid = false;
      }

      if (this.convocatory.type === undefined || this.convocatory.type.id === undefined) {
        this.type_tooltip = [];
        this.type_tooltip['error'] = "Seleccione el tipo de convocatoria.";
        isValid = false;
      }

      var idsConvocatoryTypes = this.convocatoryTypes.map(function(a) {return a.id;});
      if (this.convocatory.type !== undefined && this.convocatory.type.id !== undefined 
          && idsConvocatoryTypes.indexOf(parseInt(this.convocatory.type.id.toString())) == -1) {
        this.type_tooltip = [];
        this.type_tooltip['error'] = "El tipo de convocatoria no existe.";
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
          case "place": {
            this.place_tooltip = [];
            this.place_tooltip['error'] = errors[variable];
            break;
          }
          case "description": {
            this.description_tooltip = [];
            this.description_tooltip['error'] = errors[variable];
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
    this.cancelation.emit();
  }
}


