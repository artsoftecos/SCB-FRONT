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
    this.loadPendingOfferers();
  }

  approve(nit) {
    this.offererService.approve(nit).subscribe(response => {
      this.loadPendingOfferers();
    });
  }

  reject(nit) {
    this.offererService.reject(nit).subscribe(response => {
      this.loadPendingOfferers();
    });
  }

  loadPendingOfferers() {
    this.offererService.getPending().subscribe(oferrers => {
      this.oferrers = oferrers;
    });
  }
}
