import { Component, OnInit } from '@angular/core';
import { auth, db } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthService } from '../services/on-auth.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  name: string = '';
  isLogged: boolean = false;
  constructor(private authService: AuthService) {} // Inietta il servizio AuthService nel costruttore

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLogged = true;
        this.retrieveUsername();
      } else {
        this.isLogged = false;
      }
    });
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async retrieveUsername() {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'users', uid);

      await this.delay(300); // Attendi per 2.5 secondi

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.get('username')) {
        this.name = userSnapshot.get('username');
      } else {
        this.name = 'Stranger!';
      }
    } else {
      alert('No user uid found');
    }
  }
}
