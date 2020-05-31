import { Injectable } from '@angular/core';
import { FileInfo, MIME_TYPE_FOLDER } from '../../app/modals/fileInfo';
// import * as UploaderForGoogleDrive from '../../assets/js/UploaderForGoogleDrive.js';
import '../../assets/js/googleuploader.js';
declare const UploaderForGoogleDrive: any;

@Injectable()
export class FileRepository {
  create(parentId: string, folderName: string) {
    // tslint:disable-next-line: prefer-const
    let folder = {
      name: folderName,
      mimeType: MIME_TYPE_FOLDER,
      parents: [parentId],
    }
    return gapi.client.drive.files
      .create({
        resource: folder,
        fields: 'id, name, mimeType, modifiedTime, size',
      })
      .then((res) => {
        return FileInfo.fromGoogleFile(res.result);
      });
  }

  delete(fileId: string) {
    return gapi.client.drive.files.delete({
      fileId,
    });
  }
  getFiles(folderId: string) {
    return gapi.client.drive.files
      .list({
        pageSize: 100,
        fields:
          'nextPageToken, files(id, name, mimeType, modifiedTime, size, shared)',
        q: `'${folderId}' in parents and trashed = false`,
        orderBy: 'name',
      })
      .then((res) => {
        const files: FileInfo[] = [];
        res.result.files.forEach((file) =>
          files.push(FileInfo.fromGoogleFile(file))
        );
        return files;
      });
  }

  getAllShareableLinks(files: FileInfo[]): any {
    const permission = {
      type: 'anyone',
      role: 'reader',
      allowFileDiscovery: false,
    };
    const promises = [];
    files.forEach((file) => {
      if (!file.Shared) {
        promises.push(
          gapi.client.drive.permissions.create({
            resource: permission,
            fileId: file.Id,
          })
        );
      }
    });

    return Promise.all(promises);
  }

  importFile(parentId: string, file: FileInfo, onError: any, onComplete: any, onProgress: any) {
    const contentType = file.Blob.type || 'application/octet-stream';
    const metadata = {
      name: file.Blob.name,
      mimeType: contentType,
      parents: [parentId],
    };

    const uploader = new UploaderForGoogleDrive({
      file: file.Blob,
      token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
        .access_token,
      metadata,
      onError,
      onComplete,
      onProgress,
      params: {
        convert: false,
        ocr: false,
      },
    });

    uploader.upload();
  }
  // importFile(parentId:string, name:string, blob:Blob) {
  //     const boundary = 'hintdesk';
  //     const delimiter = "\r\n--" + boundary + "\r\n";
  //     const close_delim = "\r\n--" + boundary + "--";

  //     var reader = new FileReader();
  //     reader.readAsBinaryString(blob);
  //     reader.onload = function (e) {
  //         var contentType = blob.type || 'application/octet-stream';
  //         var metadata = {
  //             name: name,
  //             mimeType: contentType,
  //             parents: [parentId]
  //         };

  //         var base64Data = btoa(reader.result.toString());
  //         var multipartRequestBody =
  //             delimiter +
  //             'Content-Type: application/json\r\n\r\n' +
  //             JSON.stringify(metadata) +
  //             delimiter +
  //             'Content-Type: ' + contentType + '\r\n' +
  //             'Content-Transfer-Encoding: base64\r\n' +
  //             '\r\n' +
  //             base64Data +
  //             close_delim;

  //         return gapi.client.request({
  //             'path': '/upload/drive/v3/files',
  //             'method': 'POST',
  //             'params': { 'uploadType': 'multipart' },
  //             'headers': {
  //                 'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
  //             },
  //             'body': multipartRequestBody
  //         });
  //     }
  // }
}
