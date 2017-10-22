import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Oferrer } from '../models/oferrer';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';

@Injectable()
export class FieldService extends BaseService {

    public entity: String = 'fields';

    getFields() {
        //return this.baseGet(this.entity + '/approved');
        return null;
    }

}
