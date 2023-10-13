import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { UserComponent } from './user/user.component';
import { OfflinePageComponent } from './offline-page/offline-page.component';



const routes: Routes = [
  { path: 'offline', component: OfflinePageComponent },
  { path: '', component: HomeContentComponent},
  { path: 'auth', component:  AuthComponent }, 
  { path: 'code', component: CodeEditorComponent},
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
