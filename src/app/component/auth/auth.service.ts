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

}
