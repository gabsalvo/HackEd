import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {
  constructor() {}

  public trophies: any[] = [
    {
      id: 1,
      description: 'Risolvi il primo esercizio',
      requirement: 'hello-security',
      unlocked: false,
      iconURL: '/assets/trophy.png',
    },
    {
      id: 2,
      description: 'Mock Description',
      requirement: 'Mock requirement',
      unlocked: false,
      iconURL: '/assets/award.png',
    },
    {
      id: 3,
      description: 'Mock Description',
      requirement: 'Mock requirement',
      unlocked: false,
      iconURL: '/assets/award.png',
    },
    {
      id: 4,
      description: 'Mock Description',
      requirement: 'Mock requirement',
      unlocked: false,
      iconURL: '/assets/award.png',
    },
    {
      id: 5,
      description: 'Mock Description',
      requirement: 'Mock requirement',
      unlocked: false,
      iconURL: '/assets/award.png',
    },
  ];

  async isExerciseSolvedByUser(userId: string, exerciseName: string): Promise<boolean> {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      const solvedExercises = userSnapshot.get('solved_exercises') || [];

      return solvedExercises.includes(exerciseName);
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
  async updateTrophiesForUser(userId: string) {
    for (const trophy of this.trophies) {
      trophy.unlocked = await this.isExerciseSolvedByUser(userId, trophy.requirement);
    }
  }
}
