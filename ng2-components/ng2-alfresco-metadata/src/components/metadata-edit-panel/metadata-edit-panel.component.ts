import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild,
    ReflectiveInjector,
    Injector
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
    @ViewChild('panelContent', { read: ViewContainerRef }) panelContent;
    active:boolean = false;
    title:string = 'No title';
    panelRef: PanelReference;

    constructor(
        private resolver:ComponentResolver,
        private panelService: EditPanelService
    ) {
         panelService.registerContainer(this);
    }

    open(config): PanelReference {
        this.panelRef = new PanelReference();

        this.resolver.resolveComponent(config.component)
            .then((factory:ComponentFactory<any>) => {
                if(!this.panelContent.instance) {
                   this.panelContent = this.panelContent.createComponent(factory, 0);
                }

                this.panelContent.instance.model = Object.assign({}, (config.data || {}));
         })

        this.title = config.options.title;
        this.active = true;

        return this.panelRef;
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
