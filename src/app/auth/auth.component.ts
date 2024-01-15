import { Component, OnInit } from '@angular/core';
import {
  auth,
  db,
  loginWithGoogleDev,
  registerWithGoogleDev,
} from '../../../firebase.config';
import { AuthService } from '../services/on-auth.service';
import { getRandomUsername } from 'randomUsername';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  getRandomUsername = getRandomUsername;
  loginWithGoogleDev = loginWithGoogleDev;
  isLogged: boolean = false;
  username: string = '';
  clans: string[] = [
    'Binary Battlers',
    'Crypto Crusaders',
    'Network Nomads',
    'System Sentinels',
  ];
  selectedClan: string = '';
  clanSelected: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLogged = true;
        this.router.navigate(['/user']);
      } else {
        this.isLogged = false;
      }
    });
  }

  onClanSelected() {
    if (this.selectedClan) {
      this.clanSelected = true;
    }
  }

  async generateRandomUsername() {
    this.username = await getRandomUsername();
    console.log(this.username);
  }

  async registerProcedure() {
    await registerWithGoogleDev();
    const randomUsername = this.username;
    if (randomUsername) {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const userRef = doc(db, 'users', uid);
        await setDoc(
          userRef,
          {
            email: email,
            username: randomUsername,
            registrationCompleted: true,
            level: 1,
            exercises_solved: 0,
            clan: this.selectedClan,
            exp: 0,
            solved_exercises: [],
            percentage: 0,
          },
          { merge: true },
        );
        const updatedSnapshot = await getDoc(userRef);
      }
    }
  }
}
