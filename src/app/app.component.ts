import { Component, OnInit } from '@angular/core';
import {
  getNotificationPermission,
  sendNotification,
  sendNotificationDelayed,
} from '../../firebase.config';
import { AuthService } from './services/on-auth.service';
import { auth, db, logoutFromGoogle } from 'firebase.config';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  ChatService,
  ChatComponent,
  ChatRoomComponent,
  WrapperComponent,
} from '@gabriele-salvo/socket-chat-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HackEd';
  sendNotification = sendNotification;
  sendNotificationDelayed = sendNotificationDelayed;
  activeRooms: string[] = [];
  roomCode = '';
  inRoom = false;
  username: string = '';

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
  ) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.retrieveData();
      } else {
        this.username = 'Stranger';
      }
    });
  }

  ngOnInit(): void {
    // Registra il service worker
    this.registerServiceWorker();

    // Sottoscrivi l'Observable user$ del servizio
    this.authService.user$.subscribe((user) => {
      if (user) {
        // Se l'utente è autenticato
        this.requestNotificationPermission();
      }
    });
    this.chatService.getActiveRoomsUpdates().subscribe((rooms: string[]) => {
      this.activeRooms = rooms;
    });
    this.fetchActiveRooms();
  }
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async requestNotificationPermission() {
    setTimeout(async () => {
      await getNotificationPermission();
    }, 2000); // 2000ms ovvero 2 secondi di ritardo
  }

  private registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
  createRoom(): void {
    this.roomCode = this.chatService.generateRoomCode();
    console.log(this.roomCode);
    this.joinRoom();
  }

  joinRoom(): void {
    this.chatService.joinRoom(this.roomCode, this.username);
    this.inRoom = true;
  }
  leaveRoom(): void {
    this.chatService.leaveRoom(this.roomCode, this.username);
    this.roomCode = '';
    this.inRoom = false;
  }

  fetchActiveRooms(): void {
    this.chatService.getActiveRooms().subscribe((rooms: string[]) => {
      this.activeRooms = rooms;
    });
  }
  async retrieveData() {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'users', uid);

      await this.delay(300);

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.get('username')) {
        this.username = userSnapshot.get('username');
      } else {
        this.username = 'Stranger!';
      }
    }
  }
}
