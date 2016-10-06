import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild
} from '@angular/core';

import {
    MetadataDetailsEditComponent
} from '../metadata-details/metadata-details-edit.component';

declare let __moduleName:string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-edit-panel',
    templateUrl: './metadata-edit-panel.component.html',
    styleUrls: [
        './metadata-edit-panel.component.css'
    ],
    directives: []
})
export class MetadataEditPanelComponent {
    private @ViewChild('panelContent', { read: ViewContainerRef }) panelContent;
    model:any;
    active:boolean = false;
    title:string = 'No title';

    constructor(private resolver:ComponentResolver) {
        resolver
            .resolveComponent(MetadataDetailsEditComponent)
            .then((factory:ComponentFactory<any>) => {
                this.panelContent = this.panelContent.createComponent(factory);
            })
    }

    open(title:string) {
        this.title = title;
        this.active = true;
    }

    close() {
        this.active = false;
    }

    // private createPanelContent(): any {
    //     @Component({
    //         selector: 'panel-content',
    //         template: '<div>{{ title }}</div>'
    //     })
    //     class PanelContent {
    //         title:string = 'Wow!';
    //     }

    //     return PanelContent;
    // }
}