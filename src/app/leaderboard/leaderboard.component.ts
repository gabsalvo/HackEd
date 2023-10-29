import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/on-auth.service';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from 'firebase.config';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  topUsers: any[] = [];

  ngOnInit(): void {
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.topUsers = await this.getTopUsersByExp(10);
      } else {
      }
    });
  }

  constructor(public auth: AuthService) {}

  async getTopUsersByExp(limitNum: number) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('exp', 'desc'), limit(limitNum));

    const querySnapshot = await getDocs(q);
    const users: any = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  }
}
