import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileToUpload: File = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      this.handleError(error);
      console.log(error);
    });
  }

  postFile(fileToUpload: File): Observable<any> {
    let username: string = 'Administrator';
    let password: string = 'Administrator';
    const endpoint = 'http://localhost:8080/nuxeo/api/v1/upload';
    const httpOptions = {
      headers: {
        'Authorization': "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json",
        "withCredentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE"
      }
    };
    return this.http
      .post(endpoint, fileToUpload, httpOptions);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}

