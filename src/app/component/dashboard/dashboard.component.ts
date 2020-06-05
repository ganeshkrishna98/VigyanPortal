// import { GapiSession } from './../../../infrastructures/sessions/gapi.session';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from './../upload/upload.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashBoardItems = [];

  // tslint:disable-next-line: max-line-length
  constructor(
    private uploadService: UploadService,
    private zone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private GapiSession: GapiSession
    ) { }

  ngOnInit(): void {
    this.getFolders();
    // this.GapiSession.signIn();
  }

  getFolders(){
    this.uploadService.getFiles('root').then(
      response => {
        this.zone.run(() => {
          this.dashBoardItems = response;
        });
      }
    );
  }

  redirectTo(data: any){
  const itemData = this.dashBoardItems.find(element => element.Name === data);
  // tslint:disable-next-line: max-line-length
  const routePath = itemData.Name === 'Notes' ? '/noteup' : itemData.Name === 'Question Papers' ? '/questionpaperup' : itemData.Name === 'Lecture Videos' ? '/videoup' : '';
  // this.uploadService.sendDataOnRoot(itemData);
  this.router.navigate([routePath], {relativeTo: this.activatedRoute.parent, state: {itemData}});
  }
}
