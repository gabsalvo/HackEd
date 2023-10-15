import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-security',
  templateUrl: './1-hello-security.component.html',
  styleUrls: ['../../code-editor/code-editor.component.css']
})
export class HelloSecurityComponent {
  helloSecurityInstructions: string = `
  Le istruzioni per l'esercizio Hello Security sono le seguenti:
  ...
`;
  defaultCode: string = `/* Requisiti: 1. Non dovresti cambiare la struttura generale del codice. 2. Devi proteggere la funzione da potenziali attacchi di Buffer Overflow. 3. La funzione dovrebbe accettare un input dell'utente e stampare un saluto. */ #include <stdio.h> #include <string.h> void getUserInput() { char buffer[50]; printf("Enter your name: "); gets(buffer); printf("Hello, %s!\n", buffer); } int main() { getUserInput(); return 0; }`;
  languageId: string = '48';
  editorOptions = {theme: 'vs-dark', language: 'c'};
}
