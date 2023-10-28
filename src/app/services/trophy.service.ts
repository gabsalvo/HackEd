import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {
  constructor() {}

  public trophies: any[] = [
    {
      id: 1,
      description: 'Risolvi il primo esercizio',
      requirement: 'Total: 150',
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

  checkTrophy(id: number) {
    switch (id) {
      case 1:
        this.trophies[0].unlocked = true;
        break;
      default:
        console.log('Trofeo non riconosciuto.');
    }
  }
}
