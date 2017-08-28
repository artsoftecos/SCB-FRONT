import { Component, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  modalActions3 = new EventEmitter<string|MaterializeAction>();
  
  openModal3() {
    this.modalActions3.emit({action:"modal",params:['open']});
  }
  closeModal3() {
    this.modalActions3.emit({action:"modal",params:['close']});
  }

}
