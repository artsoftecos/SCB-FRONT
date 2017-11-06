import { Component, OnInit } from '@angular/core';
import { ApplicantConvocatoryService } from '../../services/applicant-convocatory.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-published-list-convocatory',
  templateUrl: './published-list-convocatory.component.html',
  styleUrls: ['./published-list-convocatory.component.css']
})
export class PublishedListConvocatoryComponent implements OnInit {

   public convocatories: any = [];
  
  constructor(private authService: AuthService,
    private router: Router, private applicantConvocatoryService : ApplicantConvocatoryService) { }

  ngOnInit() {
    this.loadNotAppliedConvocatories();
  }

  loadNotAppliedConvocatories() {
    let user = this.authService.getCurrentUser();
    this.applicantConvocatoryService.getNotAppliedConvocatories(user.email).subscribe(convocatories => {
      this.convocatories = convocatories;
    });
  }

  goToConvocatory(convocatoryId: number) {
    this.router.navigate(['/approveApplicants/'+ convocatoryId]);
  }

}
