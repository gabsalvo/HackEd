import { Component, Input } from '@angular/core';
import { Judge0Service } from '../services/judge0.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  @Input() editorOptions = {theme: 'vs-dark', language: 'javascript'};
  @Input() code: string = '';
  @Input() languageId: string = '';
  output: string = '';
  customInput: string = '';
  @Input() instructions: string | undefined;

  constructor(private judgeService: Judge0Service) {}

  runCode(): void {
    this.judgeService.handleCompile(this.code, this.customInput, +this.languageId)
      .then(output => {
        this.output = output;
      })
      .catch(error => {
        this.output = 'Error during compilation or execution.';
        console.error(error);
      });
  }
}
