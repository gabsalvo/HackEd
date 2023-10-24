import { Injectable } from '@angular/core';
import axios from 'axios';
import { api_host, api_key, api_url } from 'statuses';

@Injectable({
  providedIn: 'root',
})
export class Judge0Service {
  processing: boolean = false;
  outputDetails: any = '';

  maxAttempts = 10;

  constructor() {}

  async handleCompile(
    code: string,
    customInput: string,
    languageId: number
  ): Promise<string> {
    return new Promise((resolve) => {
      this.processing = true;

      setTimeout(() => {
        let result = 'Wrong'; // Inizializziamo result con il valore di default

        try {
          if (code.includes('int result = calculateTotal(data, 10);')) {
            result = 'Wrong';
          } else if (code.includes('int result = calculateTotal(data, 5);')) {
            result = 'Total: 150';
          }
        } catch (error) {
          console.error('An error occurred:', error);
          result = 'Error during compilation or execution.';
        } finally {
          this.processing = false;
          resolve(result);
        }
      }, 2000); // Simula un ritardo di 2 secondi
    });
  }

  /*async handleCompile(code: string, customInput: string, languageId: number): Promise<string> {
    
   this.processing = true;
    const formData = {
      language_id: languageId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const url = `${api_url}?base64_encoded=true&fields=stdout`;

    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': api_host,
          'X-RapidAPI-Key': api_key,
        },
      });

      console.log('res.data', data);
      const token = data.token;
      return await this.checkStatus(token);
    } catch (err) {
      this.processing = false;
      console.error(err);
      throw err;
    }
  }*/

  /*private async checkStatus(token: string, attempt = 1): Promise<string> {
    if (attempt > this.maxAttempts) {
      this.processing = false;
      console.error('Max polling attempts reached. Stopping.');
      throw new Error('Max polling attempts reached.');
    }

    const url = `${api_url}/${token}?base64_encoded=true&fields=*`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          'X-RapidAPI-Host': api_host,
          'X-RapidAPI-Key': api_key,
        },
      });

      const statusId = data.status?.id;
      console.log(`Received statusId: ${statusId} on attempt ${attempt}`);

      if (statusId === 1 || statusId === 2) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return await this.checkStatus(token, attempt + 1);
      } else {
        this.processing = false;
        this.outputDetails = data;
        console.log('response.data', data);
        return typeof data.stdout === 'string' ? atob(data.stdout) : '';
      }
    } catch (err) {
      this.processing = false;
      console.error(err);
      throw err;
    }
  }*/
}
