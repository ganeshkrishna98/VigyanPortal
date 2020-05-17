import { Component} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] })

export class LoginComponent {
  title = 'Login to VigyanPortal';
  email: string;
  password: string;
  errorMessage: string;
  subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  
  ngOnInit(){
    if (this.password === undefined && this.email === undefined) {
      this.logout();
    }
  }

  login() {
    if (this.validateEmail(this.email)){
    this.authService.login(this.email, this.password).then(value => {
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      this.errorMessage = 'The password is incorrect or the user does not exist';
    });
    this.email = this.password = '';
    }else{ this.errorMessage = 'Please enter a valid email address'}
  }

  logout() {
    this.authService.logout();
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
