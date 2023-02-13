import { NgForm, FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
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
      firstNameInput: ['', Validators.required],
      lastNameInput: ['', Validators.required],
      emailInput: ['', Validators.required, Validators.email],
      passwordInput: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.form
    const { email, password } = this.form.value;
  }

  toggleText(){
    if(this.submissionType === 'login'){
      this.submissionType = 'join';
    } else if(this.submissionType === 'join'){
      this.submissionType = 'login';
    }
  }

}
