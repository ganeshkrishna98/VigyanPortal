import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NoteupComponent } from './component/noteup/noteup.component';
import { QuestionpaperupComponent } from './component/questionpaperup/questionpaperup.component';
import { VideoupComponent } from './component/videoup/videoup.component';
import { NoticeupComponent } from './component/noticeup/noticeup.component';
import { LoginComponent } from './component/login/login.component';


import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {AuthService} from './component/auth/auth.service';

const appRoutes: Routes = [{path: 'dashboard', component: DashboardComponent},
{path: 'noteup', component: NoteupComponent},
{path: 'questionpaperup', component: QuestionpaperupComponent},
{path: 'videoup', component: VideoupComponent},
{path: 'noticeup', component: NoticeupComponent},
{path: '', component: LoginComponent}]
;

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    DashboardComponent,
    NoteupComponent,
    QuestionpaperupComponent,
    VideoupComponent,
    NoticeupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

