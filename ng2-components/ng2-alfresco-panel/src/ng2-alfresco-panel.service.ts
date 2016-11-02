import { Injectable } from '@angular/core';

@Injectable()
export class PanelInstance {
  data: any;

  close(result?: any): void {}

  dismiss(reason?: any): void {}
}

@Injectable()
export class PanelService {
  private panel: any;

  open(config: any) {
    return this.panel.open(config);
  }

  registerContainer(panel) {
    this.panel = panel;
  }
}
