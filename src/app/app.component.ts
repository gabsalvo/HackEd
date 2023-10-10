import { Component, OnInit } from '@angular/core';
import { getNotificationPermission, auth } from '../../firebase.config';
import { sendNotification } from '../../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HackEd';
  sendNotification = sendNotification;

  ngOnInit(): void {
    onAuthStateChanged(auth, (user) => {
      if (user) { // Se l'utente è autenticato
        this.requestNotificationPermission();
      }
    });
  }

  async requestNotificationPermission() {
    await getNotificationPermission();
  }
}