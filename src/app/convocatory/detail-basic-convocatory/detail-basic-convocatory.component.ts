import { Component, OnInit, Input } from '@angular/core';
import { Convocatory } from '../../models/convocatory';

@Component({
  selector: 'app-detail-basic-convocatory',
  templateUrl: './detail-basic-convocatory.component.html',
  styleUrls: ['./detail-basic-convocatory.component.css']
})
export class DetailBasicConvocatoryComponent implements OnInit {

  @Input() 
  name: string;
  @Input()
  type: string;
  @Input()
  numberBeneficiaries: number;
  @Input()
  description: string;
  @Input()
  resultDate: string;

  constructor() { 
    console.log('ctor DetailBasicConvocatoryComponent');
  }

  ngOnInit() {
    console.log('nameee 5');
    console.log(this.name);
  }

}
