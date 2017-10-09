import { Component, OnInit } from '@angular/core';
import { ConvocatoryService } from '../../services/convocatory.service';

@Component({
  selector: 'app-published-list-convocatory',
  templateUrl: './published-list-convocatory.component.html',
  styleUrls: ['./published-list-convocatory.component.css']
})
export class PublishedListConvocatoryComponent implements OnInit {

  public convocatories: any = [];
  
  constructor(private convocatoryService : ConvocatoryService) { }

  ngOnInit() {
    this.loadPublishedConvocatories();
  }

 loadPublishedConvocatories() {
    this.convocatoryService.getPublished().subscribe(convocatories => {
      this.convocatories = convocatories;
    });
  }

  goToConvocatory(convocatoryId: number) {
    //TODO: ir al detalle de convocatoria
  }
}
