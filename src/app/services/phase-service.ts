import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';
import { Phase  } from '../models/phase'

@Injectable()
export class PhaseService extends BaseService {
  
  public entity: String = 'phase';
 
//TODO: Rest services:
// post
// get/idPhase -> trae los campos
// put

  post(phase: Phase) {
    let entity = this.entity;
    return this.basePost(entity, phase);
  }

  get(idPhase : number) {
    return this.baseGet(this.entity + "/" + idPhase);
  }
  
  put(phase: Phase) {
    let entity = this.entity;
    return this.basePut(entity, phase);
  }
}
