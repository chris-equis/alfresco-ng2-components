
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Ng2AlfrescoPanelComponent, PanelService, PanelInstance} from 'ng2-alfresco-panel';


@Component({
  selector: 'edit-test',
  template: `
    <h4>Editing Test Component</h4>
    <button (click)="panel.dismiss('Cancel')">Close</button>`,
  directives: []
})
export class EditComponent {
  constructor(private panel: PanelInstance) {

  }
}


@Component({
  selector: 'test',
  template: `
  <div class="alf-edit__header">
    <div class="alf-edit__title">
      Details
    </div>
    <div class="alf-edit__actions">
      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect"
        (click)="panel.dismiss('Cancel')">
        Cancel
      </button>
      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect"
        (click)="save()">
        Save
      </button>
    </div>
  </div>

  <div class="alf-edit__content">
    <h4>Test Component</h4>
    <button (click)="edit()">Edit</button>
  </div>

  <ng2-alfresco-panel></ng2-alfresco-panel>
  `,
  directives: [Ng2AlfrescoPanelComponent],
  providers: [PanelService]
})
export class TestComponent {

  constructor(private panel: PanelInstance, private service: PanelService) {}

  save() {
    this.panel.close({d: 'saved data'});
  }

  edit() {
    let panel = this.service.open(
     {
         component: EditComponent,
         data: {editData: 'editData'}
     });

    panel.result.then(
        (res) => console.log('closed', res),
        (res) => console.log('dismissed', res)
    );
  }
}

@Component({
  selector: 'my-app',
  template: `
    <button (click)="open()">open panel</button>
    <ng2-alfresco-panel></ng2-alfresco-panel>
    `,
  directives: [Ng2AlfrescoPanelComponent],
  providers: [PanelService]
})
class MyDemoApp {
  constructor(private service: PanelService) {}

  open() {
    let panel = this.service.open(
     {
         component: TestComponent,
         data: {dummy: 'dummy'}
     });

    panel.result.then(
        (res) => console.log('closed', res),
        (res) => console.log('dismissed',  res)
    );
  }
}
bootstrap(MyDemoApp, [
  Ng2AlfrescoPanelComponent
]);
