import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasmService {

  constructor() { }

  async handleCompile(
    code: string,
    customInput: string,
    languageId: number
  ): Promise<string>{
    return ""
  }
}
