import { relative } from 'path';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from './../upload/upload.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noteup',
  templateUrl: './noteup.component.html',
  styleUrls: ['./noteup.component.css'],
})
export class NoteupComponent implements OnInit {
  selectedSemester = '';
  selectedBranch = '';
  selectedSubject = '';
  selectedElectives = '';
  folderLocation = '';
  noteRoot = [];
  // tslint:disable-next-line: ban-types
  dropdownLists = {
    semesters: [],
    branches: [],
    subjects: [],
    electives: [],
  };
  fileToUpload: File;
  // tslint:disable-next-line: ban-types
  isDisabled: Boolean = false;
  // tslint:disable-next-line: ban-types
  isDisableUpload: Boolean = true;
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
            this.router.navigate(['../'], {
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
        } else if (this.dropdownLists.subjects.length === 0) {
          this.dropdownLists.subjects = response.sort((current, next) => current.Name.localeCompare(next.Name));
        } else if (this.dropdownLists.electives.length === 0) {
          this.dropdownLists.electives = response.sort((current, next) => current.Name.localeCompare(next.Name));
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
    this.isDisableUpload = this.fileToUpload ? false : true;
  }

  uploadFile() {
    if (this.folderLocation) {
      this.uploadService.sendLoaderData('show');
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
    }else{
      this.uploadService.sendPopoverData('Select appropriate folder before uploading.');
    }
  }

  onSemesterChange() {
    this.fileToUpload = undefined;
    this.isDisabled =
      this.selectedSemester === 'S1 and S2'
        ? true
        : this.selectedSemester === 'S3 and S4 common'
        ? true
        : this.selectedSemester === 'S8 common'
        ? true
        : false;
    if (this.selectedBranch !== '' || this.selectedSubject !== '') {
      this.dropdownLists.branches = [];
      this.dropdownLists.subjects = [];
      this.dropdownLists.electives = [];
      this.selectedSubject = '';
      this.selectedBranch = '';
      this.selectedElectives = '';

    }
    const itemData = this.dropdownLists.semesters.find(
      (element) => element.Name === this.selectedSemester
    );
    this.getList(itemData);
  }

  onBranchChange() {
    this.fileToUpload = undefined;
    if (this.selectedSubject !== '' || this.selectedElectives !== '') {
      this.dropdownLists.subjects = [];
      this.dropdownLists.electives = [];
      this.selectedSubject = '';
      this.selectedElectives = '';
    }
    const itemData = this.dropdownLists.branches.find(
      (element) => element.Name === this.selectedBranch
    );
    this.getList(itemData);
  }

  onSubjectChange() {
    this.fileToUpload = undefined;
    if (this.selectedElectives !== '') {
      this.dropdownLists.electives = [];
      this.selectedElectives = '';
    }
    const itemData = this.dropdownLists.subjects.find(
      (element) => element.Name === this.selectedSubject
    );
    this.folderLocation = itemData.Name === 'Electives' ? '' : itemData.Id;
    this.getList(itemData);
  }

  onElectivesChange() {
    this.fileToUpload = undefined;
    const itemData = this.dropdownLists.electives.find(
      (element) => element.Name === this.selectedElectives
    );
    this.folderLocation = itemData.Id;
  }
}
