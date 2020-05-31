import { FileSession } from './../infrastructures/sessions/file.session';
import { UploadService } from './component/upload/upload.service';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GapiSession } from '../infrastructures/sessions/gapi.session';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NoteupComponent } from './component/noteup/noteup.component';
import { QuestionpaperupComponent } from './component/questionpaperup/questionpaperup.component';
import { VideoupComponent } from './component/videoup/videoup.component';
import { LoginComponent } from './component/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from './component/auth/auth.service';
import {enableProdMode} from '@angular/core';
import { ForgotpasswdComponent } from './component/forgotpasswd/forgotpasswd.component';
import { AppRepository } from 'src/infrastructures/repositories/app.repository';
import { FileRepository } from 'src/infrastructures/repositories/file.repository';
import { UserRepository } from 'src/infrastructures/repositories/user.repository';
import { AppContext } from 'src/infrastructures/app.context';
import { AppSession } from 'src/infrastructures/sessions/app.session';

if (environment.production) {
  enableProdMode();
}

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'noteup', component: NoteupComponent },
  { path: 'questionpaperup', component: QuestionpaperupComponent },
  { path: 'videoup', component: VideoupComponent },
  { path: '', component: LoginComponent },
  { path: 'forgotpasswd', component: ForgotpasswdComponent}
];

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    DashboardComponent,
    NoteupComponent,
    QuestionpaperupComponent,
    VideoupComponent,
    LoginComponent,
    ForgotpasswdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },
    AppContext,

    AppSession,
    FileSession,
    GapiSession,

    AppRepository,
    FileRepository,
    UserRepository,
    AuthService,
    UploadService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
