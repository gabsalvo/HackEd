import { Component, OnInit } from '@angular/core';
import { TrophyService } from 'src/app/services/trophy.service';
import { AuthService } from 'src/app/services/on-auth.service';

@Component({
  selector: 'app-trophies-page',
  templateUrl: './trophies-page.component.html',
  styleUrls: ['./trophies-page.component.css'],
})
export class TrophiesPageComponent implements OnInit {
  trophies: any[];

  constructor(
    private trophyService: TrophyService,
    public authService: AuthService
  ) {
    this.trophies = this.trophyService.trophies;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        const uid = this.authService.getUserUid();
        this.trophyService.updateTrophiesForUser(uid);
      } else {
      }
    });
  }
}
