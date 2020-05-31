import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FileInfo } from 'src/app/modals/fileInfo';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UploadService {

  // public rootParams = new Subject<any>();
  // public sendDataOnRoot$ = this.rootParams.asObservable();

  constructor(private http: HttpClient) {}

  // sendDataOnRoot(data: any){
  //   this.rootParams.next({data});
  // }

  getFiles(folderId: string) {
    return gapi.client.drive.files
      .list({
        pageSize: 100,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, size)',
        q: `'${folderId}' in parents and trashed = false`,
      })
      .then((res) => {
        const files: FileInfo[] = [];
        res.result.files.forEach((file) =>
          files.push(FileInfo.fromGoogleFile(file))
        );
        return files;
      });
  }

  // tslint:disable-next-line: variable-name
  fileupload(dataFile: any, folderId: string) {
    const file = dataFile;
    const contentType = file.type || 'application/octet-stream';
    const user = gapi.auth2.getAuthInstance().currentUser.get();
    const oauthToken = user.getAuthResponse().access_token;
    const initResumable = new XMLHttpRequest();
    const folder = {
      name: file.name,
      mimeType: contentType,
      parents: [folderId],
      body: file,
    };

    return gapi.client.drive.files
      .create({
        resource: folder,
        fields: 'id, name, mimeType, modifiedTime, size',
      })
      .then((res) => {
        return res;
      });
  }
}
