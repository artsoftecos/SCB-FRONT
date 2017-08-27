import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../configuration';
import { Oferrer } from '../models/oferrer';
import 'rxjs/Rx';

@Injectable()
export class OferrerService {

    public entity: String = 'oferent';
    constructor(protected http: Http) { }

    getApproved() {
        return this.http.get(SERVER_URL + this.entity)
            .map(res => res.json());
    }

    getDenied() {
        return this.http.get(SERVER_URL + this.entity)
            .map(res => res.json());
    }

    getPending() {
        return this.http.get(SERVER_URL + this.entity)
            .map(res => res.json());
    }


}
