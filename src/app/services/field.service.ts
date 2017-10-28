import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Oferrer } from '../models/oferrer';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import 'rxjs/Rx';

@Injectable()
//export class FieldService extends BaseService {
export class FieldService{
    public entity: String = 'field/getByPhase/1';
    constructor(protected http: Http) { }
    getFields() {
        let headers = this.buildHeader('sepaz91@gmail.com', 'secret');
        let options = new RequestOptions({ headers: headers });

        // return this.http.get(environment.SERVER_LOCAL + 'login', options)
        return this.http.get(environment.SERVER_URL + this.entity, options)
            .map(res => res.json())
        //return this.baseGet(this.entity + '/approved');
        //return null;
    }

    buildHeader(email: string, password: string) {
        let base64 = btoa(email + ':' + password);
        
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', environment.SERVER_URL);
        // headers.append('Access-Control-Allow-Origin', environment.SERVER_LOCAL);

        return headers;
    }
}
