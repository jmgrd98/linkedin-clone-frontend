import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @ViewChild('form') form:NgForm;

  submissionType: 'join' | 'login' = 'login';

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    this.form.value.firstName
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
