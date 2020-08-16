import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignupService } from './signup.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(
    private signupService : SignupService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    let emailData = {
      "campaignUuid" : "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      "data" : {
        "email" : ctrl.value
      }
    }

    const returnData = this.signupService.checkUser(emailData).pipe(map((response) => {
      return response.data.status=='OK'? null : {
        errorMessage : "Email already exists"
      };
    }))

    return returnData;
  }
}
