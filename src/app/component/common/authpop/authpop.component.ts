import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authpop',
  templateUrl: './authpop.component.html',
  styleUrls: ['./authpop.component.css']
})
export class AuthpopComponent implements OnInit {
  subscription: Subscription;
  @ViewChild('authpopover') private authpopover: ElementRef;
  message = '';

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.sendPopoverData$.subscribe(
      resp => {
        this.message = resp;
        this.authpopover.nativeElement.style.display = 'block';
      }
    );
  }

  closePopover(){
    this.authpopover.nativeElement.style.display = 'none';
    this.router.navigate(['']);
  }
}
