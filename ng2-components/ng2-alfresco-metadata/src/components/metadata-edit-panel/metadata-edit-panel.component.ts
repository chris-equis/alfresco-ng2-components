import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild
} from '@angular/core';

import { EditPanelService } from './metadata-edit-panel.service';

declare let __moduleName:string;

class PanelRef {
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

@Component({
    moduleId: __moduleName,
    selector: 'metadata-edit-panel',
    templateUrl: './metadata-edit-panel.component.html',
    styleUrls: [
        './metadata-edit-panel.component.css'
    ],
    directives: [],
    providers: []
})
export class MetadataEditPanelComponent {
    @ViewChild('panelContent', { read: ViewContainerRef }) panelContent;
    active:boolean = false;
    title:string = 'No title';
    private panelRef;

    constructor(
        private resolver:ComponentResolver,
        private panelService: EditPanelService
    ) {
         panelService.registerContainer(this);
    }

    open(component, data) {
        this.panelRef = new PanelRef();

        this.resolver.resolveComponent(component)
         .then((factory:ComponentFactory<any>) => {
             if(this.panelContent.createComponent) {
                this.panelContent = this.panelContent.createComponent(factory);
            }

            this.panelContent.instance.model = Object.assign({}, data);
         })

         this.title = 'dummy'; //title;
         this.active = true;

        return this.panelRef.result;
    }

       close() {
         this.active = false;
         return this.panelRef._resolve(this.panelContent.instance.model)
       }

       dismiss() {
         this.active = false;
         return this.panelRef._reject(this.panelContent.instance.model);
       }
}
