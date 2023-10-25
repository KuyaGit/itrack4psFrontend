import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { accountdetails } from './data';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  private url = environment.server_link;


  constructor(
    private http: HttpClient,

  ) { }

  public adduser( accountdetails: any ): Observable<any>{
    return this.http.post(this.url + '/api/admin/add_user', accountdetails)
    .pipe(catchError(this.handleError));;
    }
    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}

