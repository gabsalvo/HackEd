import { Component, Input } from '@angular/core';
import { Judge0Service } from '../services/judge0.service';
import { AuthService } from '../services/on-auth.service';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase.config';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent {
  @Input() editorOptions = { theme: 'vs-dark', language: 'javascript' };
  @Input() code: string = '';
  @Input() languageId: string = '';
  output: string = '';
  customInput: string = '';
  @Input() instructions: string | undefined;
  isProcessing: boolean = false;
  currentTab: 'instructions' | 'output' = 'instructions';

  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  constructor(public auth: AuthService, private judgeService: Judge0Service) {}

  runCode(): void {
    this.isProcessing = true;
    this.judgeService
      .handleCompile(this.code, this.customInput, +this.languageId)
      .then((output) => {
        this.output = output;
        this.isProcessing = false;
      })
      .catch((error) => {
        this.output = 'Error during compilation or execution.';
        console.error(error);
        this.isProcessing = false;
      });
  }
  
}
