import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/on-auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  constructor(public auth: AuthService) {}

}
