import { Component, OnInit } from '@angular/core';
import { ConvocatoryService } from '../../services/convocatory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-list-approve-phases-convocatory',
  templateUrl: './pending-list-approve-phases-convocatory.component.html',
  styleUrls: ['./pending-list-approve-phases-convocatory.component.css']
})
export class PendingListApprovePhasesConvocatoryComponent implements OnInit {

  public convocatories: any = [];
  
  constructor(private router: Router, private convocatoryService : ConvocatoryService) { }

  ngOnInit() {
    this.loadPendingApprovedPhases();
  }

  loadPendingApprovedPhases() {
    this.convocatoryService.getPendingApprovePhases().subscribe(convocatories => {
      this.convocatories = convocatories;
    });
  }

  goToConvocatory(convocatoryId: number) {
    this.router.navigate(['/approveApplicants/'+ convocatoryId]);
  }

}
