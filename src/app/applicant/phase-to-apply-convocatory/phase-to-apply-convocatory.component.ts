
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { EventEmitter } from '@angular/core';
import { Convocatory } from '../../models/convocatory';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConvocatoryService } from '../../services/convocatory.service';
import { PhaseService } from '../../services/phase-service';
import { ConvocatoryType } from '../../models/convocatory-type';
import { Location } from '@angular/common';
import { ConvocatoryState } from '../../models/convocatory-state';
import { Phase } from '../../models/phase';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-phase-to-apply-convocatory',
  templateUrl: './phase-to-apply-convocatory.component.html',
  styleUrls: ['./phase-to-apply-convocatory.component.css']
})
export class PhaseToApplyConvocatoryComponent implements OnInit {
  actions1 = new EventEmitter<string|MaterializeAction>();
  convocatory: Convocatory;
  phase: Phase;
  currentState : String;
  statePendingData: String = 'PendienteRegistroDatos';
  statePending: String = 'Pendiente';
  stateApproved: String = 'Aprobado';
  stateRejected: String = 'Rechazado';
  stateRejectedOtherPhase: String = 'RechazadoFaseAnterior';
  isEnabledPhase: boolean = false;

  constructor(private location: Location, 
    private route: ActivatedRoute, private convocatoryService: ConvocatoryService,
      private phaseService: PhaseService, private router: Router) { 
        console.log("llego");

        //se obtiene la fase actual, si:
        // es nula = la fase ya termino, no hay disponible por lo que se muestra mensaje de que ya fue cerrada.
        // si <> null: muestra datos de la fase y:
        //  si es PendienteRegistroDatos: mostrar el boton de aplicar.
        //  si es Pendiente:  muestra mensaje de que su aplicacion esta pendiente de ser respondida.
        //  si es Aprobado: Se muestra mensaje de que fue aprobado, que pronto se habilitara la siguiente fase.
        //  si es Rechazado: Se muestra que fue rehazado en esa fase.
        //  si es RechazadoFaseAnterior: indica que el ya habia aplicado en otra fase anterior, pero no paso a esta fase, por lo cual se debe indicar que el no esta en esta fase por su rechazo.

    this.route.paramMap
      .switchMap((params: ParamMap) => this.convocatoryService.get(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
      .subscribe(convocatory => {
        console.log(convocatory);
        this.convocatory = convocatory;
        this.loadCurrentPhase();       
      });
  }

  ngOnInit() {
    this.habilitarAcordeon();
  }

  goBack(): void {
    this.location.back();
  }

  loadCurrentPhase(){

    //TODO: descomentarear y cambiar la parte de onbtener fase para que se comporte de acuerdo al estado que envie el back.
  /*
    this.phaseService.getByConvocatory(this.convocatory.id)
    .subscribe(phases => {
      console.log(phases);   
      console.log(phases[0]);      
      this.phase = phases[0];
    });*/
   

//   this.habilitarCerradoConvocatoria();
this.habilitarAplicar();
/*this.habilitarPendiente();
this.habilitarAprobado();
this.habilitarRechazado();
this.habilitarRechazadoDeFaseAnterior();*/

    this.habilitarFase();
    this.habilitarAcordeon();

  }

  goToApply() {
    //TODO: Sebastian aca pone la navegacion para ir a sus campos.
    //O solo se quitaria y se llamaria un metodo para aplicar a esta convocatoria.
    //El parametro q quiera.. convocatoria o fase
    this.router.navigate(['/ruta.../'+ this.convocatory.id]);
  }

  ngAfterViewInit() {    
   this.habilitarAcordeon();
  }

  //Tests:
  habilitarCerradoConvocatoria(){
    this.currentState = null;
    this.phase=null;
  }

  habilitarAplicar() {
    this.crearFaseDummy();
    this.currentState = 'PendienteRegistroDatos';
  }

  habilitarPendiente() {
    this.crearFaseDummy();
    this.currentState = 'Pendiente';
  }

  habilitarAprobado() {
    this.crearFaseDummy();
    this.currentState = 'Aprobado';
  }

habilitarRechazado() {
    this.crearFaseDummy();
    this.currentState = 'Rechazado';
  }

  habilitarRechazadoDeFaseAnterior() {
    this.crearFaseDummy();
    this.currentState = 'RechazadoFaseAnterior';
  }


  crearFaseDummy() {
   this.phase = new Phase();
    this.phase.id = 1;    
    this.phase.name = "fase inscripcion";
    this.phase.description = "desc";
    this.phase.startDate = "2017 - 5 -2";
    this.phase.endDate = "2017-55-8";
    this.phase.startApprovalDate = "2015-8-9";
    this.phase.endApprovalDate = "2016-8-9";
    this.phase.convocatory = this.convocatory;
  }

  habilitarAcordeon() {
   $('.collapsible').collapsible({
      accordion : true
    });
  }

  habilitarFase() {
   this.isEnabledPhase = false;
    if (this.phase !== null && this.phase !== undefined) {
      this.isEnabledPhase = true;
    }
  }
}
