import { Component, OnInit } from '@angular/core';
import { getNotificationPermission, sendNotification, sendNotificationDelayed } from '../../firebase.config';
import { AuthService } from './services/on-auth.service'; // Importa il servizio AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HackEd';
  sendNotification = sendNotification;
  sendNotificationDelayed = sendNotificationDelayed;

  constructor(private authService: AuthService) {} // Inietta il servizio AuthService nel costruttore

  ngOnInit(): void {
    // Sottoscrivi l'Observable user$ del servizio
    this.authService.user$.subscribe(user => {
      if (user) { // Se l'utente è autenticato
        this.requestNotificationPermission();
      }
    });
  }

  async requestNotificationPermission() {
    await getNotificationPermission();
  }
}
