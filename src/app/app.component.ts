import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  user: User;
  title = 'ARTSOFT';
  
  sidenavActions = new EventEmitter<any>();
  sidenavParams = [];
  
  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

  logout() {
    this.userService.removeCurrentUser();
      window.location.reload();
      this.router.navigate(['/']); 

  }

}
