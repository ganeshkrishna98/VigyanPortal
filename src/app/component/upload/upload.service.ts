import { FileRepository } from './../../../infrastructures/repositories/file.repository';
import { AppContext } from './../../../infrastructures/app.context';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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



 get_access_token_using_saved_refresh_token() {
    // from the oauth playground
    // tslint:disable-next-line: variable-name
    const refresh_token = '1//04460-R25rD4zCgYIARAAGAQSNwF-L9Ird1Wnkc7QmxqP-T7-Zl3-pOamDY1PCKX9Px6s92SP7teNwUg79nA7nYS7CQPEVMyrIdI';
    // from the API console
    // tslint:disable-next-line: variable-name
    const client_id = '130754741123-e31u7h8l1sv4frss8lbpq13cgg9op6h7.apps.googleusercontent.com';
    // from the API console
    // tslint:disable-next-line: variable-name
    const client_secret = 'hzb17i4hkY9DNIVc16YosAs8';
    // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
    // tslint:disable-next-line: variable-name
    const refresh_url = 'https://www.googleapis.com/oauth2/v4/token';

    // tslint:disable-next-line: variable-name
    const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`;

    // tslint:disable-next-line: variable-name
    const refresh_request = {
        body: post_body,
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    // post to the refresh endpoint, parse the json response and use the access token to call files.list
    return fetch(refresh_url, refresh_request).then( response => {
            return(response.json());
        // tslint:disable-next-line: variable-name
        }).then( response_json =>  {
            // tslint:disable-next-line: one-variable-per-declaration
            const token: GoogleApiOAuth2TokenObject = {
              access_token: response_json.access_token,
              expires_in: response_json.expires_in,
              error: null,
              state: response_json.scope
            };
            gapi.auth.setToken(token);
            return response_json;
    });
  }

}
