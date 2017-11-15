import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';
import { Phase  } from '../models/phase'

@Injectable()
export class PhaseService extends BaseService {
  
  public entity: String = 'phase';
 
  post(phase: Phase) {
    return this.basePost(this.entity, phase);
  }

  get(idPhase : number) {
    return this.baseGet(this.entity + "/getPhases/" + idPhase);
  }
  
  put(phase: Phase) {
    return this.basePost(this.entity+"/edit", phase);
  }

  delete(idPhase : number) {
    return this.basePost(this.entity+"/delete/"+idPhase);
  }

  //TODO: ajustar el metodo para que le apunte a la controladora que si traiga todas las fases de 
  //una convocatoria
  getByConvocatory(idConvocatory: number) {    
    return this.baseGet(this.entity + "/getPhasesOfConvocatory/" + idConvocatory);
  }

  getApplicantsToApprove(idPhase: number) {
    return this.baseGet(this.entity + "/byId/" + idPhase);
  }


  getFieldsByPhase(idPhase: number) {
    // console.log(this.baseGet("field/getByPhase/" + idPhase))
    return this.baseGet("field/getByPhase/" + idPhase);
  }


  getCurrentPhaseToApply(idConvocatory: number, mail: String) {
   return this.baseGet(this.entity + "/getCurrentPhase/" + idConvocatory+"/"+mail);
  }
}

