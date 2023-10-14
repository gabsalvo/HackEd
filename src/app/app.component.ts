import { Component, OnInit } from '@angular/core';
import { getNotificationPermission, sendNotification, sendNotificationDelayed } from '../../firebase.config';
import { AuthService } from './services/on-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HackEd';
  sendNotification = sendNotification;
  sendNotificationDelayed = sendNotificationDelayed;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Registra il service worker
    this.registerServiceWorker();

    // Sottoscrivi l'Observable user$ del servizio
    this.authService.user$.subscribe(user => {
      if (user) { // Se l'utente è autenticato
        this.requestNotificationPermission();
      }
    });
  }

  async requestNotificationPermission() {
    setTimeout(async () => {
        await getNotificationPermission();
    }, 2000); // 2000ms ovvero 2 secondi di ritardo
}


  private registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
}
