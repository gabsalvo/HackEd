import { Component } from '@angular/core';
import { Judge0Service } from '../services/judge0.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'console.log("Hello world!");';
  languageId: string = '63';
  output: string = '';
  customInput: string = ''; // Assumendo che tu abbia un input per questo

  constructor(private judgeService: Judge0Service) {}

  runCode(): void {
    this.judgeService.handleCompile(this.code, this.customInput)
      .then(output => {
        this.output = output;
      })
      .catch(error => {
        this.output = 'Error during compilation or execution.';
        console.error(error);
      });
  }
}
