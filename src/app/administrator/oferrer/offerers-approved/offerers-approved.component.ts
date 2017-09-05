import { Component, OnInit } from '@angular/core';
import { OferrerService } from '../../../services/oferrer.service';

@Component({
  selector: 'app-administrator-offerers-approved',
  templateUrl: './offerers-approved.component.html',
  styleUrls: ['./offerers-approved.component.css'],
  providers: [OferrerService]
})
export class OfferersApprovedComponent implements OnInit {

  public oferrers: any = [];

  constructor(private offererService: OferrerService) { }

  ngOnInit() {
    this.offererService.getApproved().subscribe(oferrers => {
      this.oferrers = oferrers;
      console.log(oferrers);
    });
  }

  edit(nit) {
    console.log("Editar a " + nit);
  }

  reject(nit) {
    this.offererService.reject(nit).subscribe(response => {
      console.log(response);
    });
    console.log("Rechazar a " + nit);
  }

}
