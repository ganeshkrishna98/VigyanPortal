import { Injectable } from '@angular/core';
import { AppRepository } from '../repositories/app.repository';
const CLIENT_ID = '130754741123-e31u7h8l1sv4frss8lbpq13cgg9op6h7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA_m0h7en17J2d-cyPbw4E6ullxsd4UEIk';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

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
