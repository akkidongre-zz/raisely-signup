import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { EmailValidatorService } from './email-validator.service';
import { trigger, transition, style, animate, keyframes } from "@angular/animations";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations : [
    trigger('signInConfirm', [
      transition('* => signedUp', [
        animate('0.7s', keyframes([
          style({transform : 'translateY(500%) scale(1)', offset : 0}),
          style({ transform : 'translateY(-100%) scale(5)', offset : 0.5})
        ]))
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {

  name : string;
  signupForm : FormGroup;
  hidePassword : boolean = true;
  private campaignUuid : string = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";

  pageAction : string = "signupForm";
  errorMessage : string = '';

  constructor(
    private fb : FormBuilder,
    private signupService : SignupService,
    private emailValidator : EmailValidatorService
  ) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', {validators : [Validators.required, Validators.email], asyncValidators : [this.emailValidator], updateOn : "blur"}],
      password : ['', Validators.required]
    })

  }

  showOrHidePassword(){
    this.hidePassword = !this.hidePassword;
  }

  onSignup() {
    this.errorMessage = '';
    let userData = {
      "campaignUuid" : this.campaignUuid,
      "data" : {
        "firstName" : this.signupForm.get('firstName').value,
        "lastName" : this.signupForm.get('lastName').value,
        "email" : this.signupForm.get('email').value,
        "password" : this.signupForm.get('password').value
      }
    }

    this.name = this.signupForm.get('firstName').value;

    this.pageAction = 'signing in';

    this.signupService.signup(userData).subscribe((response) => {
      this.pageAction = 'signed up';
    },
    (error) => {

      if(error.error.errors[0].code=='already exists'){
        this.pageAction = 'signupForm';
        setTimeout(() => {
          this.signupForm.get('email').setErrors({
            errorMessage : "Email already exists"
          })
        }, 500)
      }
      else if(error.error.errors[0].code == 'validation error') {
        this.pageAction = 'signupForm';
        setTimeout(() => {
          this.signupForm.get('email').setErrors({
            errorMessage : "Wrong email"
          })
        }, 500)
      }
      else{
        this.pageAction = 'error';
      }
    });
  }

  goBack(){
    this.signupForm.reset();
    this.pageAction = 'signupForm';
  }

}
