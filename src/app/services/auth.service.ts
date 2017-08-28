import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../configuration';
import { User } from '../models/user';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(protected http: Http) { }

  login(email: string, password: string) {
    let headers = this.buildHeader(email, password);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(SERVER_URL + 'login', options)
      .map(res => res.json())
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  buildHeader(email: string, password: string) {
    let base64 = btoa(email + ':' + password);
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
  }

}
