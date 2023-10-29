import { Component, OnInit } from '@angular/core';
import { auth, db, logoutFromGoogle } from 'firebase.config';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthService } from '../services/on-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  username: string = '';
  isLogged: boolean = false;
  logoutFromGoogle = logoutFromGoogle;
  email: any;
  clan: any;
  level: any;
  exp: any;
  percentage: any;
  solved_exercises: any;
  editable: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.retrieveData();
      } else {
        this.username = 'Stranger!';
      }
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLogged = true;
        this.retrieveData();
      } else {
        this.isLogged = false;
      }
    });
  }

  editUsername() {
    this.editable = true;
  }

  async saveUsername() {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { username: this.username }, { merge: true });
    this.editable = false;
  } else {
    alert('No user uid found');
  }
}


  navigate() {
    this.router.navigate(['/auth']);
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async retrieveData() {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'users', uid);

      await this.delay(300); // Attendi per 300 millisecondi

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.get('username')) {
        this.username = userSnapshot.get('username');
      } else {
        this.username = 'Stranger!';
      }
      if (userSnapshot.get('clan')) {
        this.clan = userSnapshot.get('clan');
      } else {
        this.clan = 'No clan!';
      }
      if (userSnapshot.get('exp')) {
        this.exp = userSnapshot.get('exp');
      } else {
        this.exp = 'No exp';
      }
      if (userSnapshot.get('level')) {
        this.level = userSnapshot.get('level');
      } else {
        this.level = 'No level';
      }
      if (userSnapshot.get('email')) {
        this.percentage = userSnapshot.get('percentage');
      } else {
        this.percentage = 'No percentage';
      }
      if (userSnapshot.get('email')) {
        this.email = userSnapshot.get('email');
      } else {
        this.email = 'Weird no Email';
      }
      if (userSnapshot.get('solved_exercises')) {
        this.solved_exercises = userSnapshot.get('solved_exercises');
      } else {
        this.email = 'No exercises solved';
      }
    } else {
      alert('No user uid found');
    }
  }

  async deleteUser() {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, 'users', uid);

      // Verifica se l'utente esiste prima di cancellarlo
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        try {
          // Elimina i dati dell'utente dal database
          await deleteDoc(userRef);
          console.log('User data for UID', uid, 'deleted successfully');

          // Revoca il token di notifica
          //await revokeNotificationToken();

          // Effettua il logout
          await logoutFromGoogle();

          // Rimuovi l'utente da Firebase Auth
          await user.delete();
          console.log('User removed from Firebase Auth');
        } catch (error: any) {
          console.error('Error during the delete user process:', error);
          if (error.details) {
            console.error('Error details:', error.details);
          }
        }
      } else {
        console.log('No data found for UID', uid);
      }
    } else {
      console.warn('No authenticated user found');
    }
  }
}
