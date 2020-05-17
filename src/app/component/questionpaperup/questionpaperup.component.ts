import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionpaperup',
  templateUrl: './questionpaperup.component.html',
  styleUrls: ['./questionpaperup.component.css'],
})
export class QuestionpaperupComponent implements OnInit {

  fileUploaded: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCredentials().subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  upload(){
    this.authService.fileupload(this.fileUploaded).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
