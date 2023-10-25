import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	redirectUrl: string = "";
	isAlertOnceOnTokenExpire: boolean = false;
	acccountuser_id: number = 0;
	account_type: number = 0;

	constructor(
		private router: Router
	) { }

	setToken(token: any) {
		localStorage.setItem('user_loginSession', token);
	}

	getToken() {
		var sessionVal: any;
        sessionVal = localStorage.getItem('user_loginSession');
		if (sessionVal) {
            this.acccountuser_id  = JSON.parse(sessionVal)['accountuser_id'];
			this.account_type  = JSON.parse(sessionVal)['account_type'];
        }
		return sessionVal;
	}

	isLoggedIn() {
		const usertoken = this.getToken();
		if (usertoken != null) {
			return true
		}
		return false;
	}

	logout() {

		localStorage.removeItem('user_loginSession');
		this.router.navigate(['']);
		window.location.reload();
	}
}
