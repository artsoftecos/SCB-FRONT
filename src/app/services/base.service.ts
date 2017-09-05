import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../configuration';
import { AuthService } from './auth.service';
import 'rxjs/Rx';

@Injectable()
export class BaseService {

    public header = new Headers();

    constructor(protected http: Http, protected authService: AuthService) { }

    baseGet(entity: String) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(SERVER_URL + entity, options)
            .map(res => res.json());
    }

    basePost(entity: String) {
        console.log(entity);
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        return this.http.post(SERVER_URL + entity, options)
            .map(res => res.json());
    }

    basePut(entity: String) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        return this.http.put(SERVER_URL + entity, options)
            .map(res => res.json());
    }

    baseDelete(entity: String) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(SERVER_URL + entity, options)
            .map(res => res.json());
    }

    buildHeader() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.authService.getToken());
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }
}