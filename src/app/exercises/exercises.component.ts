import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  constructor( private router: Router) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user auth')
         
      } else {
        this.navigate();
      }
  })
  }

  ngOnInit() {}

  navigate() {
    this.router.navigate(['/auth']);
  }
}
