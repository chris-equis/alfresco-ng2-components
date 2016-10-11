import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild
} from '@angular/core';

import { EditPanelService } from './metadata-edit-panel.service';
import { PanelReference } from './metadata-edit-panel-context';

declare let __moduleName:string;

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
    @ViewChild('content', {read: ViewContainerRef}) content;
    @ViewChild('component', { read: ViewContainerRef }) component;

    active:boolean = false;
    title:string = 'No title';
    private panelRef: PanelReference;

    constructor(
        private resolver: ComponentResolver,
        private panelService: EditPanelService
    ) {
         panelService.registerContainer(this);
    }

    open(config): PanelReference  {
        this.resolver.resolveComponent(config.component).then((factory) => {
              this.content.clear();
              this.component = this.content.createComponent(factory);
              this.component.instance.model = Object.assign({}, (config.data || {}));
          });

        this.title = config.options.title;
        this.active = true;
        this.panelRef = new PanelReference();

        return this.panelRef;
    }

    close(): void {
        this.active = false;
        this.panelRef.resolve(this.component.instance.model)
    }

    dismiss(): void {
        this.active = false;
        this.panelRef.reject(this.component.instance.model);
    }
}
