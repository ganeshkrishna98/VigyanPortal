import { UploadService } from './../../upload/upload.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  subscription: Subscription;
  @ViewChild('loader') private loader: ElementRef;

  constructor(private uploadService: UploadService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.subscription = this.uploadService.sendLoaderData$.subscribe((resp) => {
      if (resp === 'show') { this.showLoader(); }
      else if (resp === 'hide') { this.hideLoader(); }
    });
  }

  showLoader() {
    // $('.loader-backdrop').style.display = 'block';
    this.loader.nativeElement.style.display = 'block';
  }

  hideLoader() {
    // $('.loader-backdrop').style.display = 'none';
    this.loader.nativeElement.style.display = 'none';
  }
}
