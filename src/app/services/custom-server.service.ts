import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomServerService {
  private API_ENDPOINT =
    'https://brave-rabbit-annually.ngrok-free.app/api/compile';

  constructor(private http: HttpClient) {}

  async handleCompile(
    code: string,
    customInput: string,
    languageId: number
  ): Promise<string> {
    const requestBody = {
      code: code,
      input: customInput,
      languageId: languageId,
    };

    const headers = {
      'ngrok-skip-browser-warning': 'true',
    };

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.API_ENDPOINT, requestBody, { headers: headers })
      );
      if (response && response.output) {
        return response.output;
      } else {
        throw new Error('Output not found in the response');
      }
    } catch (error) {
      console.error('Error during compilation:', error);
      throw error;
    }
  }
}
