import { Injectable } from '@angular/core';
import { auth } from 'firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      console.log("User: ", user); // <-- Aggiungi questa riga
      if (user) {
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }
}
