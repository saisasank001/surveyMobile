import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {



  serverUrl = 'http://13.235.182.245:3000/';
  imageUrl = 'http://13.235.182.245:3000/images/';
  // serverUrl = 'http://13.234.144.50:5000/api/';
  // imageUrl="http://13.234.144.50:5000/images/";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getApi(url: any) {
    return this.http.get<any[]>(this.serverUrl + url).pipe(
        catchError(this.handleError)
    );
  }

  postApi(json: any, url) {
    return this.http.post<any>(this.serverUrl + url, json, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }
  putApi(json: any, url) {
    return this.http.put<any>(this.serverUrl + url, json, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
