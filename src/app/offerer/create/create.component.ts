import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'offerer-create',
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

  registerOfferer() {
    console.log('Registrar oferente');
  }

}
