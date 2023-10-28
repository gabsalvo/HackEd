import { Component, OnInit } from '@angular/core';
import {
  auth,
  db,
  loginWithGoogleDev,
  logoutFromGoogle,
} from '../../../firebase.config';
import { AuthService } from '../services/on-auth.service';
import { getRandomUsername } from 'randomUsername';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-auth-dev',
  templateUrl: './auth-dev.component.html',
  styleUrls: ['./auth-dev.component.css']
})
export class AuthDevComponent implements OnInit {
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


  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLogged = true;
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



}
