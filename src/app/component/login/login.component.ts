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
      console.log('Nice, it worked!');
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
    });
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
