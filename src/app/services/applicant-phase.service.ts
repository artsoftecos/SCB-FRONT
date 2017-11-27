import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';
import { Convocatory } from '../models/convocatory'

@Injectable()
export class ApplicantPhaseService extends BaseService {

  public entity: String = 'AppPerPhase/getAsociation/';

  getAppPhase(id) {
    console.log(this.entity + id)
    return this.baseGet(this.entity + id);
  }

  downloadFile(convocatoryId, phaseId, email, name) {
    return this.baseGet("convocatory/downloadDocument/" + convocatoryId + "/" + phaseId + "/"+email+"/"+name);
  }
}
