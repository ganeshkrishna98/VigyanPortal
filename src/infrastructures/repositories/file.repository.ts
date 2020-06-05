import { Injectable } from "@angular/core";
import { FileInfo, MIME_TYPE_FOLDER } from "../../app/modals/fileInfo";
declare const UploaderForGoogleDrive;

@Injectable()
export class FileRepository {

    create(parentId: string, folderName: string) {
        const folder = {
            name: folderName,
            mimeType: MIME_TYPE_FOLDER,
            parents: [parentId]
        };
        return gapi.client.drive.files.create({
            resource: folder,
            fields: "id, name, mimeType, modifiedTime, size"
        }).then((res) => {
            return FileInfo.fromGoogleFile(res.result);
        });
    }

    delete(fileId: string) {
        return gapi.client.drive.files.delete({
            fileId: fileId
        });
    }
    getFiles(folderId: string) {
        return gapi.client.drive.files.list({
            pageSize: 100,
            fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
            q: `'${folderId}' in parents and trashed = false`
        }).then((res) => {
            let files: FileInfo[] = [];
            res.result.files.forEach((file) => files.push(FileInfo.fromGoogleFile(file)));
            return files;
        });
    }

    importFile(parentId: string, file: FileInfo, onError: any, onComplete: any, onProgress: any) {
        const contentType = file['type'] || 'application/octet-stream';
        const metadata = {
            name: file.Name,
            mimeType: contentType,
            parents: [parentId]
        };

        const uploader = new UploaderForGoogleDrive({
            file: file,
            token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
            metadata: metadata,
            onError: onError,
            onComplete: onComplete,
            onProgress: onProgress,
            params: {
                convert: false,
                ocr: false
            }

        });

        uploader.upload();
    }
    // importFile(parentId:string, name:string, blob:Blob) {
    //     const boundary = 'hintdesk';
    //     const delimiter = "\r\n--" + boundary + "\r\n";
    //     const close_delim = "\r\n--" + boundary + "--";

    //     const reader = new FileReader();
    //     reader.readAsBinaryString(blob);
    //     reader.onload = function (e) {
    //         const contentType = blob.type || 'application/octet-stream';
    //         const metadata = {
    //             name: name,
    //             mimeType: contentType,
    //             parents: [parentId]
    //         };

    //         const base64Data = btoa(reader.result.toString());
    //         const multipartRequestBody =
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
