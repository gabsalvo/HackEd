import { Component, OnInit } from '@angular/core';
import { auth, db, logoutFromGoogle, removeUser, /*revokeNotificationToken*/ } from 'firebase.config';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { AuthService } from '../services/on-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  name: string = '';
  isLogged: boolean = false;
  isMenuActive: boolean = false;
  logoutFromGoogle = logoutFromGoogle;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  constructor(public authService: AuthService, private router: Router) {
    auth.onAuthStateChanged((user) => {
      if (user) {
          // L'utente è loggato
          this.retrieveUsername();
      } else {
          // L'utente ha effettuato il logout
          this.name = 'Stranger!';
      }
  })
  } 

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

  navigate() {
    this.router.navigate(['/auth']);
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async retrieveUsername() {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const userRef = doc(db, 'users', uid);

        await this.delay(300); // Attendi per 300 millisecondi

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
