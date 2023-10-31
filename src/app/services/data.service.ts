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
    return this.http.get<any>(this.url.concat('/api/admin/allusers'));

  }

  public get_user_profile(accountuser_id: number): Observable<any> {
    return this.http
      .post<any>(this.url.concat('/api/admin/userprofile'), {
        accountuser_id: accountuser_id,
      })
      .pipe(catchError(this.handleError));
  }
  public get_child_profile(child_id: number): Observable<any> {
    return this.http
      .post<any>(this.url.concat('/api/beneficiary/getchildprofile'), {
        child_id: child_id,
      })
      .pipe(catchError(this.handleError));
  }

  public getbeneficiary(accountuser_id: number): Observable<any> {
    return this.http
    .post<any>(this.url.concat('/api/beneficiary/getbeneficiary'), {
        accountuser_id: accountuser_id,
      })
  }


  public deleteuserprofile(accountuser_id: string): Observable<any> {
    return this.http.post<any>(this.url.concat('/api/admin/deleteuserprofile'), {
      accountuser_id: accountuser_id,
    })
    .pipe(catchError(this.handleError));
  }

  public deletechildprofile(child_id: string): Observable<any> {
    return this.http.post<any>(this.url.concat('/api/beneficiary/deletechild'), {
      child_id: child_id,
    })
    .pipe(catchError(this.handleError));
  }

  public getchildbyschool(schoolname: string): Observable<any>{
    return this.http.post<any>(this.url.concat('/api/beneficiary/getchildbyschool'), {
      schoolname: schoolname,
    })
    .pipe(catchError(this.handleError))
  }

  public update_profile(ProfileData: any): Observable<any> {
    return this.http
      .post<any>(this.url.concat('/api/admin/updateuserprofile'), {
        ProfileData,
      })
      .pipe(catchError(this.handleError));
  }
  public update_beneficiary_status(child_id: number, beneficiary_status: number): Observable<any> {
    return this.http
      .post<any>(this.url.concat('/api/beneficiary/updatechildbeneficiarystatus'), {
        child_id,
        beneficiary_status
      })
      .pipe(catchError(this.handleError));
  }

  public addchildbeneficiary(childbeneficiary : any): Observable<any> {
    return this.http
    .post<any>(this.url.concat('/api/beneficiary/addbeneficiary'), {
        childbeneficiary,
      })
  }

  public changepassword( accountuser: any ) : Observable<any> {
    return this.http.
    post(this.url.concat('/api/admin/changepassword'),
      accountuser,
      ).pipe(catchError(this.handleError));
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    const req = new HttpRequest('POST', `${this.url}/api/image-upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
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
