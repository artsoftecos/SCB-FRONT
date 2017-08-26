import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../configuration';
import { User } from '../models/user';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(protected http: Http) { }

  login(email: string, password: string) {
    return this.http.post(SERVER_URL + 'login', { email: email, password: password })
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

}
