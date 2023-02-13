import { NgForm, FormGroup, FormBuilder, Validators, NgModel, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // @ViewChild('form') form:FormGroup;

  submissionType: 'join' | 'login' = 'login';
  form:FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      firstNameInput: new FormControl(['', Validators.required]),
      lastNameInput: new FormControl(['', Validators.required]),
      emailInput: new FormControl(['', Validators.required, Validators.email]),
      passwordInput: new FormControl(['', Validators.required])
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    const password  = this.form.value.passwordInput;
    const email = this.form.value.emailInput;
    const firstName = this.form.value.firstNameInput;
    const lastName = this.form.value.lastNameInput;
    
    if(!email || !password) return;

    if(this.submissionType === 'login'){
      console.log('handle login', email, password);
    } else if(this.submissionType === 'join'){
      if(!firstName || !lastName) return;
      console.log('handle join', email, password, firstName, lastName);
    }
  }

  toggleText(){
    if(this.submissionType === 'login'){
      this.submissionType = 'join';
    } else if(this.submissionType === 'join'){
      this.submissionType = 'login';
    }
  }

}
