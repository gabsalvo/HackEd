import { Component } from '@angular/core';
import { AuthService } from '../services/on-auth.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  isMenuActive: boolean = false;
  constructor(public auth: AuthService) { }

  toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
  }

}
