import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild
} from '@angular/core';

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
    private @ViewChild('panelContent', { read: ViewContainerRef }) panelContent;
    model:any;
    active:boolean = false;
    title:string = 'No title';

    constructor(
        private resolver:ComponentResolver
    ) {}

    open(title:string, component) {
        this.resolver
            .resolveComponent(component)
            .then((factory:ComponentFactory<any>) => {
                console.log(this.panelContent.createComponent(factory));

                this.title = title;
                this.active = true;
            });
    }

    close() {
        this.active = false;
    }
}