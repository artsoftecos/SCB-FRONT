import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';
import { Convocatory  } from '../models/convocatory'

@Injectable()
export class ConvocatoryService extends BaseService {
  
  public entity: String = 'convocatory';
  
  post(convocatory: Convocatory) {
    let entity = this.entity;
    return this.basePost(entity, convocatory);
  }
}
