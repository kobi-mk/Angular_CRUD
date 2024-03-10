import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginModel, SignupModel } from './json.model';
import { DBservice } from '../../API_HIT.service/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent implements OnInit {
  signup_form!: FormGroup;
  signupModelObject: SignupModel = new SignupModel();
  login_form!: FormGroup;
  loginModelObject: LoginModel = new LoginModel();

  get_signup_data: any;

  type_sn: string = "password";
  eye_icon_sn: string = "fa-eye-slash";
  is_text: boolean = false;
  type_ln: string = "password";
  eye_icon_ln: string = "fa-eye-slash";

  constructor(private fb: FormBuilder, private db: DBservice, private router: Router) {

  }

  ngOnInit(): void {
    this.signup_form = this.fb.group({
      fn: ['', Validators.required],
      un: ['', Validators.required],
      tp: ['', Validators.required],
      ln: ['', Validators.required],
      g: ['', Validators.required],
      pwd: ['', Validators.required]
    })
    this.login_form = this.fb.group({
      un_ln: ['', Validators.required],
      pwd_ln: ['', Validators.required]
    })
    //this.getSignupData();
  }

  // Valiudatiuon
  private validate(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validate(control)
      }
    })
  }

  // Post signup data 
  postSignupData() {
    if (this.signup_form.valid) {
      //console.log(this.signup_form.value)
      this.signupModelObject.fn = this.signup_form.value.fn;
      this.signupModelObject.un = this.signup_form.value.un;
      this.signupModelObject.tp = this.signup_form.value.tp;
      this.signupModelObject.ln = this.signup_form.value.ln;
      this.signupModelObject.g = this.signup_form.value.g;
      this.signupModelObject.pwd = this.signup_form.value.pwd;

      this.db.postSignup(this.signupModelObject).subscribe(res => {
        console.log(res);
        alert("Data Stored Sucessfully")
        this.signup_form.reset();
      })
    }
    else {
      this.validate(this.signup_form);
      alert("Your form is invalid")
      //this.signup_form.reset();
    }
  }

  // Get signup data 
  getSignupData() {
    this.db.getSignup(this.signupModelObject).subscribe(res => {
      this.get_signup_data = res;

      // Authendication function
      const loginCheck = res.find((getData: any) => {
        return getData.un === this.login_form.value.un_ln && getData.password === this.login_form.value.password1
      });
      if (loginCheck) {
        alert("Login success");
        this.login_form.reset();
        // Navigation
        this.router.navigate(['/home'])
        //this.router.navigate(["/home"])
      }
      else { 
        alert("User not found")
        this.login_form.reset();
     }
    })
  }


  // Password hide and unhide SignUP
  hidedShowPwdSignup() {
    this.is_text = !this.is_text;//Chnage value as true 
    this.is_text ? this.eye_icon_sn = "fa-eye" : this.eye_icon_sn = "fa-eye-slash";
    this.is_text ? this.type_sn = "text" : this.type_sn = "password";
    //show password          => hide psw
  }
  // Password hide and unhide LogIN
  hidedShowPwdLogin() {
    this.is_text = !this.is_text;//Chnage value as true 
    this.is_text ? this.eye_icon_ln = "fa-eye" : this.eye_icon_ln = "fa-eye-slash";
    this.is_text ? this.type_ln = "text" : this.type_ln = "password";
    //show password          => hide psw
  }
}
