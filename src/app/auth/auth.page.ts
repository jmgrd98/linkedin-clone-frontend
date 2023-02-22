import { NgForm, FormGroup, FormBuilder, Validators, NgModel, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {NewUser} from "./models/newUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  submissionType: 'join' | 'login' = 'login';
  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      firstNameInput: this.formBuilder.control('', Validators.required),
      lastNameInput: this.formBuilder.control('', Validators.required),
      emailInput: this.formBuilder.control('', Validators.required),
      passwordInput: this.formBuilder.control('', Validators.required)
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    const password  = this.form.value.passwordInput;
    const email = this.form.value.emailInput;
    const firstName = this.form.value.firstNameInput;
    const lastName = this.form.value.lastNameInput;

    console.log(this);
    console.log(this.form);

    // return;
    // if(!email || !password) return;
    if(this.submissionType === 'login'){
      console.log('handle login', email, password);
      return;
    } else if(this.submissionType === 'join'){
      // const { firstName, lastName } = this.form.value;

      console.log(firstName, lastName);
      if(!firstName || !lastName) return;
      console.log('handle join', email, password, firstName, lastName);
      const newUser: NewUser = { firstName, lastName, email, password };
      return this.authService.register(newUser).subscribe(() => {
        this.toggleText();
        this.router.navigate(['/join']);
      });
    }
      return;
  }

  toggleText(){
    if(this.submissionType === 'login'){
      this.submissionType = 'join';
    } else if(this.submissionType === 'join'){
      this.submissionType = 'login';
    }
  }

}
