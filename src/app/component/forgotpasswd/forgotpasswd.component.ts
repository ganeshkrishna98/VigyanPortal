import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgotpasswd',
  templateUrl: './forgotpasswd.component.html',
  styleUrls: ['./forgotpasswd.component.css']
})
export class ForgotpasswdComponent implements OnInit {

  email: string;
  Message = '';
  m1 = ' ';
  err1 = 'The email address is badly formatted.';
  err2 = 'There is no user record corresponding to this identifier. The user may have been deleted.';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  reset(){
    if (this.validateEmail){
    this.authService.forgotpassword(this.email).then(
      (res) => {
      this.Message = 'Password reset email sent';
    },
      (err) => {
      this.m1 = err.message;
      if (this.m1 === this.err1){
        this.Message = 'Please enter a valid email address';
      }
      else {this.m1 = err.message;
            if (this.m1 === this.err2){
        this.Message = 'User does not exist Contact Administrator';
        }
      }
    });

    }

  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


}
