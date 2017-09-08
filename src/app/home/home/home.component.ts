import { Component, OnInit } from '@angular/core';
import { FileUploadComponent } from '../../input-fields/file-upload/file-upload.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullImagePath: string;
  constructor() { 
    this.fullImagePath = environment.ClientUrl + '/assets/img/img1.jpg'  
  }

  ngOnInit() {
  }

}
