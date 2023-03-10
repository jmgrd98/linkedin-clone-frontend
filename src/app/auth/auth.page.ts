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
    private router: Router
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
    const password: string  = this.form.value.passwordInput;
    const email: string = this.form.value.emailInput;
    const firstName: string = this.form.value.firstNameInput;
    const lastName: string = this.form.value.lastNameInput;

    if(!email || !password) return;

    if(this.submissionType === 'login'){
      return this.authService.login(email, password).subscribe(() => {
        this.router.navigate(['/home']);
        console.log('handle login', email, password);
      })
    }

    else if(this.submissionType === 'join'){
      console.log(firstName, lastName);

      if(!firstName || !lastName) return;

      console.log('handle join', email, password, firstName, lastName);
      const newUser: NewUser = { firstName, lastName, email, password };
      return this.authService.register(newUser).subscribe(() => {
        this.toggleText();
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
