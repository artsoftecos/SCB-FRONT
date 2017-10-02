import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Convocatory } from '../../models/convocatory'
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
  convocatoryTypes: any[];
  selectedType : number;

  //Tooltips
  name_tooltip = undefined;
  place_tooltip = undefined;
  description_tooltip = undefined;
  type_tooltip = undefined;

  constructor(private convocatoryTypeService: ConvocatoryTypeService, 
    private convocatoryService: ConvocatoryService) { }

  ngOnInit() {
    this.loadConvocatoryTypes();
  }

  loadConvocatoryTypes() {
    this.convocatoryService.post(this.convocatory).subscribe(response => {
      this.convocatory = new Convocatory();
      swal('Exito!', 'Se ha creado la convocatoria satisfactoriamente', 'success').catch(swal.noop);
    });

    this.convocatoryTypeService.get().subscribe(convocatoryTypes => {
      this.convocatoryTypes = convocatoryTypes;
    }, 
    err => {
      console.log(err);
      console.log(err.json());
      swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
    });
  }

  registerConvocatory() {
    this.convocatory.type = this.selectedType;
    if (!this.isValidConvocatory()) {
      swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      return;
    }
    this.convocatoryService.post(this.convocatory).subscribe(response => {
      this.convocatory = new Convocatory();
      swal('Exito!', 'Se ha creado la convocatoria satisfactoriamente', 'success').catch(swal.noop);
    },
    err => { 
      console.log("error:");
      console.log(err);     
      console.log(err.status);
      console.log(err.json());
      if(err.status == 400){
        swal('Oops...', 'Algo salio mal!', 'error').catch(swal.noop);
      }else{
        this.handleUiErrors(err);
        swal('Oops...', 'Completa la información', 'error').catch(swal.noop);
      }
    });
  };

  isValidConvocatory() : boolean {
    let isValid = true;
    if(this.convocatory.name === ""){
      this.name_tooltip = [];
      this.name_tooltip['error'] = "Este campo es obligatorio";
      isValid = false;
    }
    
    if(this.convocatory.place.toString() === ""){
      this.place_tooltip = [];
      this.place_tooltip['error'] = "Este campo es obligatorio";
      isValid = false;
    }
    
    if(this.convocatory.place <= 0){
      this.place_tooltip = [];
      this.place_tooltip['error'] = "Las plazas deben ser mayores a 0";
      isValid = false;
    }

    if (this.convocatoryTypes.indexOf(this.convocatory.type) == -1) {
      this.type_tooltip = [];
      this.type_tooltip['error'] = "El tipo de convocatoria no existe.";
      isValid = false;
    }
    
    return isValid;    
  };

  handleUiErrors(err: any) {
    let errors = err.json();
    for (var variable in errors) {
      if (errors.hasOwnProperty(variable)) {
        var element = errors[variable];
        switch(variable) { 
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
        document.getElementById(variable).setAttributeNode(att);
        document.getElementById(variable).classList.add("invalid");
      }
    }
  }
}
/*
this.userService.get(this.userLogin).subscribe(
        user => { 
          this.userService.setCurrentUser(user);
          window.location.reload();
          this.router.navigate(['/profile']);  
        },
        err => { 
          console.log("error:");
          console.log(err); 
         this.toastOptions.msg = err;
         console.log(err.status);
        if(err.status == 404) {
             this.toastOptions.msg = "Usuario o contraseña invalidos";
         }
        this.toastyService.error(this.toastOptions);
      }
*/

/*

 get(userLogin: UserLogin): Observable<User> {
    let body = JSON.stringify(userLogin);
    let headers = this.buildHeader();
    let options = new RequestOptions({ headers: headers });

    var apiUrl = environment.apiUrl;   
    var url = apiUrl + "/login/login";

    return this.http.post(url, body, options)
        .map((res:Response) => {         
          return res.json() as User;
        }) // ...and calling .json() on the response to return data
        .catch(this.handleError); //...errors if any
  }
*/