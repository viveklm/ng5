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
    const endpoint = 'https://dtestsecureservices.fadavis.com:443/ShoppingCart/api/ShoppingCart/LoadShoppingCartItems';
    const httpOptions = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = {
      "AccountID": 0,
      "PromoCode": "string",
      "ShoppingCartGUID": "30DCD94B-6D4F-4F99-9D66-A69C95926D72",
      "ProductID": 0,
      "Quantity": 0,
      "ShoppingCartID": 0,
      "ProductIDs": "string"
    }
  
    return this.http
      .post(endpoint, body, httpOptions);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}

