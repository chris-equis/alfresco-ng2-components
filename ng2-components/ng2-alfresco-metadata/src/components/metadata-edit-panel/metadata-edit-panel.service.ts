import { Injectable } from '@angular/core';

@Injectable()
export class EditPanelService {
  private panel: any;

  open(content, node) {
    return this.panel.open(content, node);
  }

  registerContainer(panel) {
    this.panel = panel;
  }
}
