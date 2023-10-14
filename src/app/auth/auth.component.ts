import { Component, OnInit } from '@angular/core';
import {
  auth,
  db,
  loginWithGoogle,
  logoutFromGoogle,
} from '../../../firebase.config';
import { AuthService } from '../services/on-auth.service';
import { getRandomUsername } from 'randomUsername';
import { doc, setDoc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  getRandomUsername = getRandomUsername;
  isLogged: boolean = false;
  showUsernamePopup: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  async onGoogleLogin() {
    if (!this.isLogged) {
      await loginWithGoogle(this.showUsernamePopupFunction.bind(this));
      this.isLogged = true;
    }
  }

  async onGoogleLogout() {
    if (this.isLogged) {
      await logoutFromGoogle();
    }
  }

  showUsernamePopupFunction() {
    this.showUsernamePopup = true;
  }
  async usernameToServer() {
    console.log('Chiamata a usernameToServer() iniziata...');
    const randomUsername = await getRandomUsername();
    console.log('Username ottenuto:', randomUsername);
    if (randomUsername) {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const userRef = doc(db, 'users', uid);
        console.log('Tentativo di scrittura nel database con UID:', uid);
        await setDoc(
          userRef,
          {
            email: email,
            username: randomUsername,
            registrationCompleted: true,
            level: 1,
            exercises_solved : 0
          },
          { merge: true }
        );
        const updatedSnapshot = await getDoc(userRef);
        console.log(updatedSnapshot.data());
        console.log('Scrittura nel database completata.');
        this.showUsernamePopup = false;
      } else {
        console.error('No user uid found');
      }
    } else {
      console.error('Errore nel generare un username casuale!');
    }
  }

  async saveUsername() {
    if (this.username) {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const userRef = doc(db, 'users', uid);
        await setDoc(
          userRef,
          {
            email: email,
            username: this.username,
            registrationCompleted: true,
            level: 1,
            exercises_solved : 0
          },
          { merge: true }
        );

        this.showUsernamePopup = false;
      } else {
        alert('No user uid found');
      }
    } else {
      alert('Inserisci un username valido!');
    }
  }
}
