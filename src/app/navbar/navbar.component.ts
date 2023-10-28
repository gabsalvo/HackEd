import { Component } from '@angular/core';
import { AuthService } from '../services/on-auth.service'; // Aggiorna il percorso se necessario

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuActive: boolean = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
