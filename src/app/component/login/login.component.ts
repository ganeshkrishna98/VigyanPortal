import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'Login to VigyanPortal';
  email: string;
  password: string;
  errorMessage: string;
  subscription: Subscription;
  err1 =
    'There is no user record corresponding to this identifier. The user may have been deleted.';
  err2 = 'The password is invalid or the user does not have a password.';
  m1: ' ';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.password === undefined && this.email === undefined) {
      this.logout();
    }
  }

  login() {
    if (this.validateEmail(this.email)) {
      this.authService
        .login(this.email, this.password)
        .then((value) => {
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          this.m1 = err.message;
          if (this.m1 === this.err1) {
            this.errorMessage = 'User does not exist Contact Administrator';
          }
          if (this.m1 === this.err2) {
            this.errorMessage = ' Password is incorrect';
          }
          this.email = this.password = '';
        });
    } else {
      this.errorMessage = 'Please enter a valid email address';
    }
  }

  logout() {
    this.authService.logout();
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
