import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../configuration';
import { Oferrer } from '../models/oferrer';
import { BaseService } from './base.service';
import 'rxjs/Rx';

@Injectable()
export class OferrerService extends BaseService {

    public entity: String = 'offerer';

    getApproved() {
        return this.baseGet(this.entity);
    }

    getDenied() {
        return this.baseGet(this.entity);
    }

    getPending() {
        return this.baseGet(this.entity);
    }

    approve(nit: string) {
        let entity = this.entity + "/approve/" + nit;
        return this.basePost(entity);
    }

    reject(nit: string) {
        let entity = this.entity + "/reject/" + nit;
        return this.basePost(entity);
    }

}
