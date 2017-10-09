import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import 'rxjs/Rx';

@Injectable()
export class BaseService {

    public header = new Headers();

    constructor(protected http: Http, protected authService: AuthService) { }

    baseGet(entity: String) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(environment.SERVER_URL + entity, options)
            .map(res => res.json());
    }

    basePost(entity: String, data?: any) {
        console.log(entity);
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        let body = "";
        if(data !== undefined && data !== null) {
            body = JSON.stringify(data)
        }

        console.log(body);
        console.log(options);
        return this.http.post(environment.SERVER_URL + entity,body, options)
            .map(res => res.json());
    }

    /*basePost(entity: String, data: any) {
        console.log(entity);
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        return this.http.post(environment.SERVER_URL + entity, options)
            .map(res => res.json());
    }*/

    basePut(entity: String, data?: any) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });

        let body = "";
        if(data !== undefined && data !== null) {
            body = JSON.stringify(data)
        }

        return this.http.put(environment.SERVER_URL + entity,body, options)
            .map(res => res.json());
    }

    baseDelete(entity: String) {
        let headers = this.buildHeader();
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(environment.SERVER_URL + entity, options)
            .map(res => res.json());
    }

    buildHeader() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.authService.getToken());
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }
}