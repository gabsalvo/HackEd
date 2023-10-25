import { Component, OnInit } from '@angular/core';
import { auth, db } from 'firebase.config';
import { Router } from '@angular/router';
import { AuthService } from '../services/on-auth.service';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  navigateToExercise(index: number) {
    if (index === 0) {
      this.router.navigate(['/exercises/1-hello-security']);
    }
  }

  async getStudentCount(): Promise<number> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('Utente non autenticato');
      return 0;
    }
    try {
      const studRef = doc(db, 'metadata', 'student_count');
      const studSnapshot = await getDoc(studRef);
      const dbStud = studSnapshot.get('count');
      return dbStud;
    } catch (error) {
      console.error('Errore durante la lettura del conto studenti:', error);
      return 0;
    }
  }

  async getUserProgression(): Promise<number> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('Utente non autenticato');
      return 0;
    }
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const percentageProgression = userSnapshot.get('percentage');
      return percentageProgression;
    } catch (error) {
      console.error('Errore durante la lettura della percentuale:', error);
      return 0;
    }
  }

  async getUserExercises():  Promise<number> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('Utente non autenticato');
      return 0;
    }
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const exercises_solved = userSnapshot.get('exercises_solved');
      return exercises_solved;
    } catch (error) {
      console.error('Errore durante la lettura della percentuale:', error);
      return 0;
    }
  }

  async getUserName():  Promise<string> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('Utente non autenticato');
      return "";
    }
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const userName = userSnapshot.get('username');
      return userName
    } catch (error) {
      console.error('Errore durante la lettura della percentuale:', error);
      return "";
    }
  }

  progressPercentage: number | undefined;
  studentsCount: number | undefined;
  exercisesCompleted: number | undefined;
  userName: string | undefined;

  boxes = [
    { name: 'Hello Security!' },
    { name: 'Exercise 2' },
    { name: 'Exercise 3' },
    { name: 'Exercise 4' },
    { name: 'Exercise 5' },
    { name: 'Exercise 6' },
    { name: 'Exercise 7' },
    { name: 'Exercise 8' },
    { name: 'Exercise 9' },
    { name: 'Exercise 10' },
    { name: 'Exercise 11' },
    { name: 'Exercise 2' },
    { name: 'Exercise 3' },
    { name: 'Exercise 4' },
    { name: 'Exercise 5' },
    { name: 'Exercise 6' },
    { name: 'Exercise 7' },
    { name: 'Exercise 8' },
    { name: 'Exercise 9' },
    { name: 'Exercise 10' },
  ];

  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  createBoxes() {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        name: `Box ${i + 1}`,
      });
    }
    return arr;
  }

  constructor(private router: Router, public autho: AuthService) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user auth');
        this.getStudentCount()
          .then((count) => {
            this.studentsCount = count;
          })
          .catch((error) => {
            console.error(
              'Errore durante la lettura del conto studenti:',
              error
            );
          });
          this.getUserProgression()
          .then((perc) => {
            this.progressPercentage = perc;
          })
          this.getUserExercises()
          .then((exercisesCompleted) => {
            this.exercisesCompleted = exercisesCompleted;
          })
          this.getUserName()
          .then((userName) => {
            this.userName = userName;
          })
          .catch((error) => {
            console.error(
              'Errore durante la lettura del conto studenti:',
              error
            );
          });
      } else {
        this.navigate();
      }
    });
  }

  ngOnInit() {}

  navigate() {
    this.router.navigate(['/auth']);
  }
}
