import { Injectable } from '@angular/core';
import { api_host, api_key, api_url } from 'statuses';

@Injectable({
  providedIn: 'root'
})
export class Judge0Service {

  constructor() { }

  processing: boolean = false;
  outputDetails: string = "";

  async handleCompile(code: string, customInput: string, languageId: number): Promise<string> {
    const formData = {
        language_id: languageId,
        source_code: btoa(code),
        stdin: btoa(customInput)
    };
    console.log("Sending data:", formData);
    const url = `${api_url}?base64_encoded=true&fields=stdout`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': api_host,
            'X-RapidAPI-Key': api_key
        },
        body: JSON.stringify(formData)
        
    })
    .then(response => response.json())
    .then(data => {
        console.log("res.data", data);
        const token = data.token;
        return this.checkStatus(token);  // ritorna una Promise da checkStatus
    })
    .catch(err => {
        this.processing = false;
        console.log(err);
        throw err;  // Rigetta l'errore così il chiamante può gestirlo
    });
  }

  private maxAttempts = 10; // massimo numero di tentativi di polling

private async checkStatus(token: string, attempt = 1): Promise<string> {
    if (attempt > this.maxAttempts) {
        console.error('Max polling attempts reached. Stopping.');
        throw new Error('Max polling attempts reached.');
    }

    const url = `${api_url}/${token}?base64_encoded=true&fields=*`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': api_host,
            'X-RapidAPI-Key': api_key
        }
    })
    .then(response => response.json())
    .then(data => {
      const statusId = data.status?.id;
      console.log(`Received statusId: ${statusId} on attempt ${attempt}`);

      if (statusId === 1 || statusId === 2) {
          return new Promise<string>((resolve, reject) => {
              setTimeout(() => {
                  this.checkStatus(token, attempt + 1).then(output => {
                      resolve(output);
                  }, reject);
              }, 2000);
          });
      } else {
          this.processing = false;
          this.outputDetails = data;
          console.log('response.data', data);
          return typeof data.stdout === 'string' ? atob(data.stdout) : '';
      }
  })
    .catch(err => {
        console.log("err", err);
        this.processing = false;
        throw err;
    });
}

}
