import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogin } from '../../models/userLogin';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public userLogin: UserLogin;
  public user: User;

  constructor(private authService: AuthService,
    private router: Router) {
    this.userLogin = new UserLogin();
    this.user = new User();
  }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login(this.userLogin.email, this.userLogin.password).subscribe(obj => {
      this.user = new User(obj.data);
      this.authService.setCurrentUser(this.user);
      
      switch (this.user.role.toString()) {
        case "Applicant":
          this.goToApplicant();
          break;
        case "Administrator":
          this.goToAdministrator();
          break;
        case "Offerer":
          this.goToOfferer();
          break;
      }

    }, err => {

    });
  }

  goToApplicant() {
    console.log("Go To Applicant");
    this.router.navigate(['/home']);
  }
  goToAdministrator() {
    console.log("Go To Administrator");
    this.router.navigate(['/administrator']);
  }
  goToOfferer() {
    console.log("Go To Offerer");
    this.router.navigate(['/home']);
  }
}
