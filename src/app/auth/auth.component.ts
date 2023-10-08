import { Component } from '@angular/core';
import { loginWithGoogle } from '../../../firebase.config'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  async onGoogleLogin() {
    await loginWithGoogle();
 }
}
