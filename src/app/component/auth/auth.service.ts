import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const google: any;

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  forgotpassword(email: string) {
    return  this.firebaseAuth.sendPasswordResetEmail(email);
  }




  getCredentials() {
    return this.http.get('../../../assets/credentials.json');
  }

  fileupload(file) {

    // const auth = new google.auth.JWT(
    //   credentials.client_id, null,
    //   credentials.private_key, scopes
    // );
    const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`;
    // const accessToken = localStorage.getItem('accessToken');

    // return this.http
    //     .post(url, { name: name, role: 'reader', type: 'anyone', 'parents': [{"id":parentId}] }, options)
    //     .toPromise()
    //     .then(response => this.gDriveUploadFile(content, response.headers.get('location')));
    // }
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + 'N5XZ17q6hMJswj8HK5Ehaagg',
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': 'text',//file.type,
    });

    let options = { headers: headers }; // Create a request option

    return this.http.post(`${url}`, file, options) //call proper resumable upload endpoint and pass just file as body
    //     .toPromise()
  }
}
