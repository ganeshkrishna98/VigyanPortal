import { FileRepository } from './../../../infrastructures/repositories/file.repository';
import { AppContext } from './../../../infrastructures/app.context';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileInfo } from 'src/app/modals/fileInfo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  public loaderData = new Subject<any>();
  public sendLoaderData$ = this.loaderData.asObservable();
  public popoverData = new Subject<any>();
  public sendPopoverData$ = this.popoverData.asObservable();

  constructor(
    private http: HttpClient,
    private appContext: AppContext,
    private fileRepository: FileRepository
  ) {}

  sendLoaderData(data: any) {
    this.loaderData.next(data);
  }

  sendPopoverData(data: any) {
    this.popoverData.next(data);
  }

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
    const fileContent = dataFile; // As a sample, upload a text file.
    const file = new Blob([fileContent], { type: fileContent.type });
    const metadata = {
      name: fileContent.name, // Filename at Google Drive
      mimeType: 'application/json, octet-stream', // mimeType at Google Drive
      parents: [folderId], // Folder ID at Google Drive
    };

    const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    form.append('file', file);

    return fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {
        method: 'POST',
        headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
        body: form,
      }
    );
  }

}
