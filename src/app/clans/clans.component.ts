import { Component } from '@angular/core';
import { AuthService } from '../services/on-auth.service';

@Component({
  selector: 'app-clans',
  templateUrl: './clans.component.html',
  styleUrls: ['./clans.component.css']
})
export class ClansComponent {
  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  constructor(public auth: AuthService) {}

}
