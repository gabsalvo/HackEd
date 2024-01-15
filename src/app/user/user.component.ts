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

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
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

  async retrieveData() {
    if (!auth.currentUser) {
      alert('No user uid found');
      return;
    }

    try {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'users', uid);

      const userSnapshot = await getDoc(userRef);

      this.username = userSnapshot.get('username') || 'Stranger!';
      this.clan = userSnapshot.get('clan') || 'No clan!';
      this.exp = userSnapshot.get('exp') || 'No exp';
      this.level = userSnapshot.get('level') || 'No level';
      this.percentage = userSnapshot.get('percentage') || 'No percentage';
      this.email = userSnapshot.get('email') || 'Weird no Email';
      this.solved_exercises =
        userSnapshot.get('solved_exercises') || 'No exercises solved';
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }

  async deleteUser() {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, 'users', uid);

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        try {
          await deleteDoc(userRef);
          await logoutFromGoogle();
          await user.delete();
        } catch (error: any) {
          if (error.details) {
            console.error('Error details:', error.details);
          }
        }
      }
    } else {
      console.warn('No authenticated user found');
    }
  }
}
