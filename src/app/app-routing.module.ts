import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeContentComponent } from './home-content/home-content.component';

const routes: Routes = [
  { path: 'auth', component:  AuthComponent }, 
  { path: '', component: HomeContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
