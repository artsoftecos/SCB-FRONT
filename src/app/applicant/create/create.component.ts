import { Component, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'applicant-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  firstName = "";
  secondName = "";
  firstLastName = "";
  secondLastName = "";
  address = "";
  typeDocument = "";
  documentNumber = "";
  email = "";
  cellphone = "";
  telephone = "";
  password1 = "";
  password2 = "";

  constructor() { }
  
  ngOnInit() {
  }
  registerSolicitant() {
    console.log('Registrar solicitante');
  }

}
