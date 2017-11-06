import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';

@Injectable()
export class PlaceService extends BaseService {

  public entity: String = 'place';

  approve(idPlace: number) {
    let entity = this.entity;
    return this.basePost(entity+"/approve");
  }

  reject(idPlace: number, rejectCause: String) {
    let entity = this.entity;
    return this.basePost(entity+"/reject");
  }
}