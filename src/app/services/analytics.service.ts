import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private url = environment.server_link;


  constructor(
    private http: HttpClient,
  ) { }


  public analytics_get4psholder(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/4psholder')
  .pipe(catchError(this.handleError));;
  }

  public analytics_status4(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/status4')
  .pipe(catchError(this.handleError));;
  }

  public allstatuscount(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/allstatuscount')
  .pipe(catchError(this.handleError));;
  }

  public allworking(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/allworking')
  .pipe(catchError(this.handleError));;
  }
  public status5(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/status5')
  .pipe(catchError(this.handleError));;
  }

  public allstatussum(): Observable<any>{
    return this.http.get(this.url + '/api/admin/analytics/allstatussum')
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
