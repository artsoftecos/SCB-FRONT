import { Component, OnInit, Input } from '@angular/core';
import { Convocatory } from '../../models/convocatory';
import { ConvocatoryType } from '../../models/convocatory-type';

@Component({
  selector: 'app-detail-basic-convocatory',
  templateUrl: './detail-basic-convocatory.component.html',
  styleUrls: ['./detail-basic-convocatory.component.css']
})
export class DetailBasicConvocatoryComponent implements OnInit {

  @Input()
  convocatory: Convocatory;

  constructor() { 
  }

  ngOnInit() {
  }

}
