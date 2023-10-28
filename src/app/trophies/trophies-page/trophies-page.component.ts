import { Component } from '@angular/core';
import { TrophyService } from 'src/app/services/trophy.service';

@Component({
  selector: 'app-trophies-page',
  templateUrl: './trophies-page.component.html',
  styleUrls: ['./trophies-page.component.css'],
})
export class TrophiesPageComponent {
  
  trophies: any[];

  constructor(private trophyService: TrophyService) {
    this.trophies = this.trophyService.trophies;
  }
 
}
