import { FileInfo } from './../../modals/fileInfo';
import { AppContext } from './../../../infrastructures/app.context';
import { UploadService } from './../upload/upload.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-questionpaperup',
  templateUrl: './questionpaperup.component.html',
  styleUrls: ['./questionpaperup.component.css'],
})
export class QuestionpaperupComponent implements OnInit {

  fileUploaded: any;
  files: FileInfo[];
  dataSource: any;

  selectedSemester: any[];

  constructor(private uploadService: UploadService, private appContext: AppContext, private zone: NgZone){}

  ngOnInit(): void {
    // this.files=this.refresh('1-UzDm7fx2kLK85WBHZVuoHIuLl7GY_p5');
  }
  get(event){
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(this.selectedSemester);
  }

  refresh(fileId: string) {
    this.appContext.Repository.File.getFiles(fileId)
        .then((res) => {
          // tslint:disable-next-line: no-debugger
          debugger;
          this.zone.run(() => {
                    return res;
                // this.files = res;
                // this.dataSource.data = this.files;
            });
        });
}

  upload(){
    this.uploadService.fileupload(this.fileUploaded).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
