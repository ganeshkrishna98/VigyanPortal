import { AuthService } from './../auth/auth.service';
import { GapiSession } from './../../../infrastructures/sessions/gapi.session';
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
  // tslint:disable-next-line: ban-types
  isFolders: Boolean = false;

  // tslint:disable-next-line: max-line-length
  constructor(
    private uploadService: UploadService,
    private zone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gapiSession: GapiSession,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getFolders();
  }


  async authorize(){
    await this.gapiSession.signIn();
    if (this.gapiSession.isSignedIn ){
      await this.getFolders();
      if (this.isFolders){
        this.authService.sendPopoverData('Successfully Authorized');
      }

    }
  }


  async getFolders(){
    await this.uploadService.getFiles('root').then(
      response => {
        this.zone.run(() => {
          // tslint:disable-next-line: max-line-length
          this.isFolders = (response[0].Id === '1R9Z3dWPXAMdJAVKW4JjRKjB1AIuCPfXx' && response[1].Id === '1tO6MoyuKBdqBDPFD5Mau-A_BOjQMRUGC' && response[2].Id === '14I7y-iThfN_jPTD7hS1PV_h5UN09Q2WT') ? true : false;
          ;
          if(this.isFolders){
            this.dashBoardItems = response;
          }else{
            this.authService.sendPopoverData('Authentication Error');
          }

        });
      },
      error => {
        this.authService.sendPopoverData('Unauthorized device, Please authenticate your device');
        // this.authorize();
      }
    );
  }

  redirectTo(data: any){
  const itemData = this.dashBoardItems.find(element => element.Name === data);
  // tslint:disable-next-line: max-line-length
  const routePath = itemData['Name'] === 'Notes' ? '/noteup' : itemData['Name'] === 'Question Papers' ? '/questionpaperup' : itemData['Name'] === 'Lecture Videos' ? '/videoup' : '';
  // this.uploadService.sendDataOnRoot(itemData);
  this.router.navigate([routePath], {relativeTo: this.activatedRoute.parent, state: {itemData}});
  }
}
