import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';

@Component({
  selector: 'applicant-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  
  selectedOption = "";
  selectOptions = [];
  firstName = "";
  secondName = "";
  firstLastName = "";
  secondLastName = "";
  address = "";
  documentType = "1";
  documentNumber = "";
  email = "";
  cellphone = "";
  telephone = "";
  password = "";
  password2 = "";
  captcha = "";
  headers = undefined;

  firstName_tooltip = undefined;
  secondName_tooltip = undefined;
  firstLastName_tooltip = undefined;
  secondLastName_tooltip = undefined;
  address_tooltip = undefined;
  documentType_tooltip = undefined;
  documentNumber_tooltip = undefined;
  email_tooltip = undefined;
  cellphone_tooltip = undefined;
  telephone_tooltip = undefined;
  password_tooltip = undefined;
  password2_tooltip = undefined;
 
  constructor(private http: Http) { 
    this.headers = new Headers();
    
    window.setTimeout(()=>{
      this.selectOptions = [
        {value:1,name:"CC"},
        {value:2,name:"TI"},
        {value:3,name:"CE"}
      ]
    },100);
  }
  
  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin', environment.SERVER_URL);
    this.headers.append('Content-Type', 'application/json');
  }

  registerSolicitant() {
    if(this.captcha != ""){
      let data = {
        "firstName": this.firstName,
        "secondName": this.secondName,
        "firstLastName": this.firstLastName,
        "secondLastName": this.secondLastName,
        "address": this.address,
        "documentType": {'id':this.documentType},
        "documentNumber": this.documentNumber,
        "email": this.email,
        "cellphone": this.cellphone,
        "telephone": this.telephone,
        "password": this.password,
        "password2": this.password2,
        "captcha": this.captcha
      }
      console.log('Registrar solicitante');
      console.log(data);

      this.http.post(environment.SERVER_URL + 'applicant', 
          JSON.stringify(data),
          {headers:this.headers})
      .map((res: Response) => res.json())
      .subscribe(
        (response) => {
            /* this function is executed every time there's a new output */
          console.log("VALUE RECEIVED: "+response);
        },
        (err) => {console.log(err.json());
          let errores = err.json();
          if(errores['error'] == "Bad Request"){
            swal('Oops...', 'Something went wrong!', 'error').catch(swal.noop);
          }else{
            for (var variable in errores) {
              if (errores.hasOwnProperty(variable)) {
                var element = errores[variable];
                switch(variable) { 
                  case "firstName": { 
                    this.firstName_tooltip = [];
                    this.firstName_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "secondName": { 
                    this.secondName_tooltip = [];
                    this.secondName_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "firstLastName": { 
                    this.firstLastName_tooltip = [];
                    this.firstLastName_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "secondLastName": { 
                    console.log("NIT")
                    this.secondLastName_tooltip = [];
                    this.secondLastName_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "address": { 
                    this.address_tooltip = [];
                    this.address_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "documentType": { 
                    this.documentType_tooltip = [];
                    this.documentType_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "documentNumber": { 
                    this.documentNumber_tooltip = [];
                    this.documentNumber_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "cellphone": { 
                    this.cellphone_tooltip = [];
                    this.cellphone_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "telephone": { 
                    this.telephone_tooltip = [];
                    this.telephone_tooltip['error'] = errores[variable];
                    break; 
                  } 
                  case "email": { 
                    this.email_tooltip = [];
                    this.email_tooltip['error'] = errores[variable];
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
              }
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
    }else{
      swal('Oops...', 'Confirma que no eres un robot', 'error').catch(swal.noop);
    }
  }
}
