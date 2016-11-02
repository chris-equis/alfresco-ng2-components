import { Injectable } from '@angular/core';

@Injectable()
export class PanelRef {
  public resolve: (result?: any) => void;
  public reject: (reason?: any) => void;

  result: Promise<any>;

  constructor() {
    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  close(result?: any): void {
      this.resolve(result);
  }

  dismiss(reason?: any): void {
      this.reject(reason);
  }
}
