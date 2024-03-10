import { Component, OnInit } from '@angular/core';
import { DBservice } from '../../API_HIT.service/db.service';
import { SignupModel } from '../login-signup/json.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  get_signup_data: any;
  signupModelObject: SignupModel = new SignupModel();

  constructor(private db: DBservice) { }
  
  ngOnInit(): void{
    this.getSignupData();
  }

  // Get signup data 
  getSignupData() {
    this.db.getSignup(this.signupModelObject).subscribe(res => {
      this.get_signup_data = res;
    })
  }
  deleteSignupData(id: number) {
    this.db.deleteSignup(id).subscribe(data => {
      alert("Query data deleted sucessfully")
    })
  }
}
