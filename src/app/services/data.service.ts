import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = environment.server_link;

  constructor(
    private http: HttpClient
  ) { }



  public get_all_user(): Observable<any> {
    return this.http.get<any>(this.url.concat('/api/get_all_user'));
  }

  public get_user_profile(accountuser_id: number): Observable<any> {
    return this.http
      .post<any>(this.url.concat('/api/admin/userprofile'), {
        accountuser_id: accountuser_id,
      })
      .pipe(catchError(this.handleError));
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
