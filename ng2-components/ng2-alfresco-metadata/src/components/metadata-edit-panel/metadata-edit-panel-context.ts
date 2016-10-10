import { Injectable } from '@angular/core';

@Injectable()
export class PanelReference {
  public _resolve: (result?: any) => void;
  public _reject: (reason?: any) => void;

  result: Promise<any>;

  constructor() {
    this.result = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  close(result?: any) {
      this._resolve(result);
  }

  dismiss(reason?: any) {
      this._reject(reason);
  }
}
