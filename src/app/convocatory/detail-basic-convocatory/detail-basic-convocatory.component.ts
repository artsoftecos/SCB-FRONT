import { Component, OnInit, Input } from '@angular/core';
import { Convocatory } from '../../models/convocatory';

@Component({
  selector: 'app-detail-basic-convocatory',
  templateUrl: './detail-basic-convocatory.component.html',
  styleUrls: ['./detail-basic-convocatory.component.css']
})
export class DetailBasicConvocatoryComponent implements OnInit {

  @Input()
  convocatory: any;

  constructor() { 
    console.log("ssss");
    console.log(this.convocatory);
  }

  ngOnInit() {
    //console.log("ssss");
    //console.log(this.convocatory);-->
  }

}
