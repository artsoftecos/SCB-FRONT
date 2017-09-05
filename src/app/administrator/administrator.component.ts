import { Component, OnInit } from '@angular/core';
//Service
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  providers: [AuthService]
})
export class AdministratorComponent implements OnInit {

  public action: String = 'pending';

  constructor() { }

  ngOnInit() {
  }

  goToDenied() {

    this.action = 'denied';
    console.log(this.action);
  }
  goToApproved() {
    this.action = 'approved';
    console.log(this.action);
  }
  goToPending() {
    this.action = 'pending';
    console.log(this.action);
  }
}
