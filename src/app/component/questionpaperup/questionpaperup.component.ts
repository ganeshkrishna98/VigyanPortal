import { relative } from 'path';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from './../upload/upload.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionpaperup',
  templateUrl: './questionpaperup.component.html',
  styleUrls: ['./questionpaperup.component.css'],
})
export class QuestionpaperupComponent implements OnInit {
  selectedSemester = '';
  selectedBranch = '';
  folderLocation = '';
  noteRoot = [];
  // tslint:disable-next-line: ban-types
  dropdownLists = {
    semesters: [],
    branches: [],
  };
  fileToUpload: File;
  // tslint:disable-next-line: ban-types
  isDisabled: Boolean = false;
  // tslint:disable-next-line: ban-types
  showLoader: Boolean = false;
  subscription: Subscription;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private uploadService: UploadService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        take(1),
        map(() => {
          if (window.history.state.itemData === undefined) {
            this.router.navigate(['./dashboard'], {
              relativeTo: this.activatedRoute.parent,
            });
          } else {
            this.noteRoot = window.history.state.itemData;
            this.getList(this.noteRoot);
          }
        })
      )
      .subscribe((resp) => {});
  }

  getList(data: any): any {
    this.uploadService.getFiles(data.Id).then((response) => {
      this.zone.run(() => {
        if (this.dropdownLists.semesters.length === 0) {
          this.dropdownLists.semesters = response.sort((current, next) => current.Name.localeCompare(next.Name));
        } else if (
          this.dropdownLists.branches.length === 0 &&
          this.isDisabled !== true
        ) {
          this.dropdownLists.branches = response.sort((current, next) => current.Name.localeCompare(next.Name));
        }
      });
    });
  }

  // tslint:disable-next-line: ban-types
  onChangeFiles(event: Object) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList = target.files;
    this.fileToUpload = files[0];
  }

  uploadFile() {
    this.uploadService.sendLoaderData('show');
    if (this.folderLocation) {
      this.uploadService
        .fileupload(this.fileToUpload, this.folderLocation)
        .then(
          (res) => {
            if (res.status === 200){
              this.uploadService.sendLoaderData('hide');
              this.uploadService.sendPopoverData('Upload Success');
            }else{
              this.uploadService.sendLoaderData('hide');
              this.uploadService.sendPopoverData('Upload Failed');
            }
          },
          (err) => {
            this.showLoader = false;
            this.uploadService.sendLoaderData('hide');
            this.uploadService.sendPopoverData('Server error. Please try later.');
          }
        );
    }
  }

  onSemesterChange() {
    // this.isDisabled =
    //   this.selectedSemester === 'S1 &S2'
    //     ? true
    //     : false;
    if (this.selectedBranch !== '') {
      this.dropdownLists.branches = [];
      this.selectedBranch = '';
    }
    const itemData = this.dropdownLists.semesters.find(
      (element) => element.Name === this.selectedSemester
    );
    this.getList(itemData);
  }

  onBranchChange() {
    const itemData = this.dropdownLists.branches.find(
      (element) => element.Name === this.selectedBranch
    );
    this.folderLocation = itemData.Id;
  }

}
