import { Injectable } from '@angular/core';

@Injectable()
export class EditPanelService {
  private panel: any;

  open(config: any) {
    return this.panel.open(config);
  }

  registerContainer(panel) {
    this.panel = panel;
  }
}
