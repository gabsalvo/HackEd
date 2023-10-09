import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';


const routes: Routes = [
  { path: '', component: HomeContentComponent},
  { path: 'auth', component:  AuthComponent }, 
  { path: 'code', component: CodeEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
