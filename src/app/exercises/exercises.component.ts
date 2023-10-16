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

  progressPercentage: number = 69;
  studentsCount: number | undefined;
  exercisesCompleted: number = 1;
  boxes = [
    { name: 'Hello Security!' },
    { name: 'Nome2' },
    { name: 'Nome3' },
    { name: 'Nome4' },
    { name: 'Nome5' },
    { name: 'Nome6' },
    { name: 'Nome7' },
    { name: 'Nome8' },
    { name: 'Nome9' },
    { name: 'Nome10' },
    { name: 'Nome11' },
    { name: 'Nome2' },
    { name: 'Nome3' },
    { name: 'Nome4' },
    { name: 'Nome5' },
    { name: 'Nome6' },
    { name: 'Nome7' },
    { name: 'Nome8' },
    { name: 'Nome9' },
    { name: 'Nome10' },
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
