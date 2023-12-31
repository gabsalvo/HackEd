import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hello-security',
  templateUrl: './1-hello-security.component.html',
  styleUrls: ['../../code-editor/code-editor.component.css']
})
export class HelloSecurityComponent {
  helloSecurityInstructions: string = ``;
  defaultCode: string = ``;
  languageId: string = '48';
  idTrophy: number = 1;
  editorOptions = {theme: 'vs-dark', language: 'c'};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Carica le istruzioni da un file .md
    this.http.get('assets/exercises/1/helloSecurityInstructions.md', { responseType: 'text' })
      .subscribe(data => {
        this.helloSecurityInstructions = data;
      });

    // Carica il codice predefinito da un file .c
    this.http.get('assets/exercises/1/hello-securityCode.c', { responseType: 'text' })
      .subscribe(data => {
        this.defaultCode = data;
      });
  }
}
