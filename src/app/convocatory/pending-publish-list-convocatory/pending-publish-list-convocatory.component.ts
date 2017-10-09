import { Component, OnInit } from '@angular/core';
import { ConvocatoryService } from '../../services/convocatory.service';

@Component({
  selector: 'app-pending-publish-list-convocatory',
  templateUrl: './pending-publish-list-convocatory.component.html',
  styleUrls: ['./pending-publish-list-convocatory.component.css']
})
export class PendingPublishListConvocatoryComponent implements OnInit {

   public convocatories: any = [];
  
  constructor(private convocatoryService : ConvocatoryService) { }

  ngOnInit() {
    this.loadPendingPublishConvocatories();
  }

 loadPendingPublishConvocatories() {
    this.convocatoryService.getPendingPublish().subscribe(convocatories => {
      this.convocatories = convocatories;
    });
  }

  goToConvocatory(convocatoryId: number) {
    //TODO: ir al detalle de convocatoria
  }

}