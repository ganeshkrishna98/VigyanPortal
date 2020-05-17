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
  errorMessage: string
  subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(){
    if (this.password === undefined && this.email === undefined) {
      this.logout();
    }
  }

  login() {
    this.authService.login(this.email, this.password).then(value => {
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      this.errorMessage = 'The password is incorrect or the user does not exist';
    });
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
