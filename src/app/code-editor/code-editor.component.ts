import { Component, Input } from '@angular/core';
import { CustomServerService } from '../services/custom-server.service';
import { AuthService } from '../services/on-auth.service';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, sendNotification } from '../../../firebase.config';

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

  constructor(public auth: AuthService, private serverService: CustomServerService) {}

  runCode(): void {
    this.isProcessing = true;
    this.serverService
      .handleCompile(this.code, this.customInput, +this.languageId)
      .then((output) => {
        this.output = output;
        this.checkSolution(this.output);
        this.isProcessing = false;
      })
      .catch((error) => {
        this.output = 'Error during compilation or execution.';
        console.error(error);
        this.isProcessing = false;
      });
  }

  async checkSolution(userSolution: any): Promise<void> {
    try {
      const solutionRef = doc(db, 'exercises', 'hello-security');
      const solutionSnapshot = await getDoc(solutionRef);
      const dbSolution = solutionSnapshot.get('solution');

      console.log('User Solution:', JSON.stringify(userSolution));
      console.log('DB Solution:', JSON.stringify(dbSolution));

      if (dbSolution.trim() === userSolution.trim()) {
        sendNotification();
        console.log('You got it!!!');
        if (auth.currentUser) {
          await this.updateExperienceAndSolvedExercises(
            auth.currentUser.uid,
            'hello-security'
          );
        } else {
          console.error('No user is currently logged in.');
        }
      } else {
        console.log('Wrong Solution');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async updateExperienceAndSolvedExercises(userId: string, exerciseId: string) {
    const userRef = doc(db, 'users', userId);

    // Ottieni i dati correnti dell'utente
    const userSnapshot = await getDoc(userRef);
    const currentExperience = userSnapshot.get('experience') || 0;
    const currentSolvedCount = userSnapshot.get('exercises_solved') || 0;
    const solvedExercises = userSnapshot.get('solved_exercises') || [];
    const percentageProgression = userSnapshot.get('percentage') || 0;

    // Verifica se l'esercizio è già stato risolto dall'utente
    if (!solvedExercises.includes(exerciseId)) {
      // Aggiorna i contatori e l'elenco degli esercizi risolti
      await updateDoc(userRef, {
        exp: currentExperience + 50,
        exercises_solved: currentSolvedCount + 1,
        solved_exercises: [...solvedExercises, exerciseId],
        percentage: percentageProgression + 5,
      });
      console.log(
        'Experience, solved exercises and percentage of progression updated!'
      );
    } else {
      console.log('Exercise already solved!');
    }
  }
}
