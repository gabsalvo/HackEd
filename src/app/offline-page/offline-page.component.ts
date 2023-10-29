import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-page',
  templateUrl: './offline-page.component.html',
  styleUrls: ['./offline-page.component.css']
})
export class OfflinePageComponent implements OnInit {
  instructions: string = 'Correggi il codice sottostante affinché la funzione restituisca il valore corretto.';
  code: string = `
function add(a, b) {
  return a - b; // Questo dovrebbe essere un + 
}

add(1, 2); // Dovrebbe restituire 3
`;
  feedback: string = '';
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  ngOnInit(): void {}

  checkSolution(): void {
    try {
      const result = eval(this.code);
      if (result === 3) {
        this.feedback = 'Ottimo lavoro! Hai corretto il codice.';
      } else {
        this.feedback = 'Non proprio giusto. Riprova!';
      }
    } catch (e) {
      this.feedback = 'Ops! Sembra che ci sia un errore nel tuo codice.';
    }
  }
}
