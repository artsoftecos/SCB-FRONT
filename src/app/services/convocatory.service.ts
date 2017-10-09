import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';
import { Convocatory  } from '../models/convocatory'

@Injectable()
export class ConvocatoryService extends BaseService {
  
  public entity: String = 'convocatory';
  public published: string = 'published';
  public pendingPublish: string = 'pendingPublish';

  post(convocatory: Convocatory) {
    let entity = this.entity;
    return this.basePost(entity, convocatory);
  }

//TODO: Rest services:
// published
//pendingPublish
// put
// get/convocatoryId -> este ya devuelve todas las fases de la convocatoria

  getPublished() {
    return this.baseGet(this.entity + "/" + this.published);
  }

  getPendingPublish() {
    return this.baseGet(this.entity + "/" + this.pendingPublish);
  }
  
  put(convocatory: Convocatory) {
    let entity = this.entity;
    return this.basePut(entity, convocatory);
  }
  
  get(convocatoryId: number) {
    return this.baseGet(this.entity + "/" + convocatoryId);
  }
}
