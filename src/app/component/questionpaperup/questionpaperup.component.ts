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
  selectedSubject = '';
  selectedElectives = '';
  folderLocation = '';
  noteRoot = [];
  // tslint:disable-next-line: ban-types
  dropdownLists = {
    semesters: [],
    branches: [],
    subjects: [],
    electives: []
  };
  fileToUpload: File;
  // tslint:disable-next-line: ban-types
  isDisabled: Boolean = false;
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
          this.dropdownLists.semesters = response;
        } else if (
          this.dropdownLists.branches.length === 0 &&
          this.isDisabled !== true
        ) {
          this.dropdownLists.branches = response;
        } else if (this.dropdownLists.subjects.length === 0) {
          this.dropdownLists.subjects = response;
        }else if (this.dropdownLists.electives.length === 0){
          this.dropdownLists.electives = response;
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
    if (this.folderLocation){
      this.uploadService.fileupload(this.fileToUpload, this.folderLocation).then(
        res => { alert(res.result.name + ' got uploaded successfully!'); },
        err => { alert('Upload failed!'); }
      );
    }
  }

  onSemesterChange() {
    this.isDisabled = this.selectedSemester === 'S1 and S2' ? true : this.selectedSemester === 'S3 and S4 common' ? true : false;
    if (this.selectedBranch !== '' || this.selectedSubject !== ''){
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
    if (this.selectedSubject !== '' || this.selectedElectives !== ''){
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
    if (this.selectedElectives !== ''){
      this.dropdownLists.electives = [],
      this.selectedElectives = '';
    }
    const itemData = this.dropdownLists.subjects.find(
      (element) => element.Name === this.selectedSubject
    );
    this.folderLocation = itemData.Name === 'Electives'? '' : itemData.Id;
    this.getList(itemData);
  }

  onElectivesChange(){
    const itemData = this.dropdownLists.electives.find(
      (element) => element.Name === this.selectedElectives
    );
    this.folderLocation = itemData.Id;
  }
}
