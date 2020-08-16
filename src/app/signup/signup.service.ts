import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl = 'https://api.raisely.com/v3/signup';
  private checkUserUrl = 'https://api.raisely.com/v3/check-user';

  constructor(
    private http : HttpClient
  ) { }

  signup(userData) : Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }

  checkUser(emailData) : Observable<any> {
    return this.http.post(this.checkUserUrl, emailData);
  }

}
