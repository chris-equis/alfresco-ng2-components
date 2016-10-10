import {Injectable, ViewRef,
  ComponentRef} from '@angular/core';


export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

@Injectable()
export class NgbActiveModal {
  close(result?: any): void {}
  dismiss(reason?: any): void {}
}

@Injectable()
export class PanelReference {
  private _resolve: (result?: any) => void;
  private _reject: (reason?: any) => void;

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
