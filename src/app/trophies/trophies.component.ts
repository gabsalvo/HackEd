import { Component } from '@angular/core';
import { AuthService } from '../services/on-auth.service';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.css']
})
export class TrophiesComponent {

  constructor(public auth: AuthService) {}

}
