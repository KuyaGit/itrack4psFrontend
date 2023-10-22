import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { accountuser } from './data';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = `${environment.server_link}/api/beneficiary/register`;

  constructor(
    private http: HttpClient
  ) {}

  public register( accountuser: any ) : Observable<any> {
    return this.http.
    post(this.url,
      accountuser,
      );
  }
}
