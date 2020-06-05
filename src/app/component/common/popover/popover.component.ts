import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from './../../upload/upload.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  subscription: Subscription;
  @ViewChild('popover') private popover: ElementRef;
  message = '';

  constructor(
    private uploadService: UploadService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.uploadService.sendPopoverData$.subscribe(
      resp => {
        this.message = resp;
        this.popover.nativeElement.style.display = 'block';
      }
    );
  }

  closePopover(){
    this.popover.nativeElement.style.display = 'none';
    this.router.navigate(['./dashboard'], {relativeTo: this.activatedRoute.parent});
  }

}
