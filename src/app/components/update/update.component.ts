import { Component, OnInit } from '@angular/core';
import { updateModel } from '../login-signup/json.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DBservice } from '../../API_HIT.service/db.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  updateModelObject: updateModel = new updateModel();
  update_id: any;

  constructor(private AR: ActivatedRoute, private DB: DBservice, private router: Router) { }
  ngOnInit(): void {
    this.update_id = this.AR.snapshot.paramMap.get('id')
    console.log('ID' + this.update_id);

    this.DB.getSignupById(this.update_id).subscribe((data: any) => {
      this.updateModelObject = data;
      console.log(data);
    })
  }
  updateSignupModel(){
    this.DB.updateSignupData(this.updateModelObject).subscribe(data =>{
      
    });
    this.router.navigate(['/home'])
  }
}
