import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {path:'user',component:LoginSignupComponent},
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'b', redirectTo: '', pathMatch: 'full' },
  {path: 'home', component:HomeComponent},
  {path: 'update/:id', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
