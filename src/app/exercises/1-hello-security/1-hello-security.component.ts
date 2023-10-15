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
  defaultCode: string = `#include <stdio.h>\n#include <string.h>\n\nvoid getUserInput() {\n    char buffer[50];\n    printf("Enter your name: ");\n    gets(buffer);\n    printf("Hello, %s!\\n", buffer);\n}\n\nint main() {\n    getUserInput();\n    return 0;\n}  `;
  languageId: string = '48';
  editorOptions = {theme: 'vs-dark', language: 'c'};
}
