import { Component, OnInit } from '@angular/core';
import { OferrerService } from '../../../services/oferrer.service';

@Component({
  selector: 'app-administrator-offerers-pending',
  templateUrl: './offerers-pending.component.html',
  styleUrls: ['./offerers-pending.component.css'],
  providers: [OferrerService]
})
export class OfferersPendingComponent implements OnInit {

  public oferrers: any = [];

  constructor(private offererService: OferrerService) { }

  ngOnInit() {
    this.offererService.getPending().subscribe(oferrers => {
      this.oferrers = oferrers;
      console.log(oferrers);
    });
  }

  approve(nit) {
    this.offererService.approve(nit).subscribe(response => {
      console.log(response);
    });
    console.log("Aprobar a " + nit);
  }

  reject(nit) {
    this.offererService.reject(nit).subscribe(response => {
      console.log(response);
    });
    console.log("Rechazar a " + nit);
  }

}
