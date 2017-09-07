import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { MaterializeDirective,MaterializeAction } from "angular2-materialize";
import { SERVER_URL } from '../../configuration';
import 'rxjs/add/operator/map';

@Component({
  selector: 'offerer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name = "";
  legalRepresentative = "";
  email = "";
  nit = "";
  address = "";
  telephone = "";
  password = "";
  password2 = "";
  headers = undefined;
  
  name_tooltip = undefined;
  legalRepresentative_tooltip = undefined;
  email_tooltip = undefined;
  nit_tooltip = undefined;
  address_tooltip = undefined;
  telephone_tooltip = undefined;
  password_tooltip = undefined;
  password2_tooltip = undefined;

  constructor(private http: Http) { 
    this.headers = new Headers();
  }
  
  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin', SERVER_URL);
    this.headers.append('Content-Type', 'application/json');
  }

  registerOfferer() {
    console.log('Registrar oferente');
    let data = {
      "name": this.name,
      "legalRepresentative": this.legalRepresentative,
      "email": this.email,
      "nit": this.nit,
      "address": this.address,
      "telephone": this.telephone,
      "password": this.password,
      "password2": this.password2,
    }
    console.log('Registrar solicitante');
    console.log(data);

    this.http.post(SERVER_URL + 'offerer', 
        JSON.stringify(data),
        {headers:this.headers})
    .map((res: Response) => res.json())
    .subscribe(
      (response) => {
             /* this function is executed every time there's a new output */
            console.log("VALUE RECEIVED: "+response);
      },
      (err) => {
        /* this function is executed when there's an ERROR */
        console.log(err.json());
        let errores = err.json();
        for (var variable in errores) {
          if (errores.hasOwnProperty(variable)) {
            var element = errores[variable];
            switch(variable) { 
              case "name": { 
                this.name_tooltip = [];
                this.name_tooltip['error'] = errores[variable];
                break; 
              } 
              case "legalRepresentative": { 
                this.legalRepresentative_tooltip = [];
                this.legalRepresentative_tooltip['error'] = errores[variable];
                break; 
              } 
              case "email": { 
                this.email_tooltip = [];
                this.email_tooltip['error'] = errores[variable];
                break; 
              } 
              case "nit": { 
                console.log("NIT")
                this.nit_tooltip = [];
                this.nit_tooltip['error'] = errores[variable];
                break; 
              } 
              case "address": { 
                this.address_tooltip = [];
                this.address_tooltip['error'] = errores[variable];
                break; 
              } 
              case "telephone": { 
                this.telephone_tooltip = [];
                this.telephone_tooltip['error'] = errores[variable];
                break; 
              } 
              case "password": { 
                this.password_tooltip = [];
                this.password_tooltip['error'] = errores[variable];
                break; 
              } 
              case "password2": { 
                this.password2_tooltip = [];
                this.password2_tooltip['error'] = errores[variable];
                break; 
              } 
           } 
            var att = document.createAttribute("data-tooltip");
            att.value = errores[variable];
            document.getElementById(variable).setAttributeNode(att);
            console.log(variable)
            console.log(document.getElementById(variable))
            document.getElementById(variable).classList.add("invalid");
          }
        }
        // [materializeParams]="tooltip"
        console.log("ERROR: "+err);
      },
      () => {
             /* this function is executed when the observable ends (completes) its stream */
             console.log("COMPLETED");
      }
    );
  }

}
