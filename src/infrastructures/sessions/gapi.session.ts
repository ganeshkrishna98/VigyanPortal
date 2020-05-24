import { Injectable, EventEmitter } from '@angular/core';
import { AppRepository } from '../repositories/app.repository';
const CLIENT_ID = '140198976940-nah42ae2ch71sqju2ei48e5kr2487l41.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDU-u6XOjocAAkbTsAVcC_z_iENTIilToM';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest', ];
const SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class GapiSession {
  googleAuth: gapi.auth2.GoogleAuth;

  constructor(private appRepository: AppRepository) {}

  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            this.googleAuth = gapi.auth2.getAuthInstance();
            resolve();
          });
      });
    });
  }
  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth
      .signIn({
        prompt: 'consent',
      })
      .then((googleUser: gapi.auth2.GoogleUser) => {
        this.appRepository.User.add(googleUser.getBasicProfile());
      });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }
}
