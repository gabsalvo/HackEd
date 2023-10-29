import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/on-auth.service';
import { auth, db } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.css'],
})
export class TrophiesComponent implements OnInit {
  constructor(public autho: AuthService) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserName()
          .then((userName) => {
            this.userName = userName;
          })
          .catch((error) => {
            console.error(
              'Errore durante la lettura del nome studente',
              error
            );
          });
      }
    });
  }

  userName: string | undefined;

  async getUserName(): Promise<string> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('Utente non autenticato');
      return '';
    }
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const userName = userSnapshot.get('username');
      return userName;
    } catch (error) {
      console.error('Errore durante la lettura della percentuale:', error);
      return '';
    }
  }

  ngOnInit() {}
}
