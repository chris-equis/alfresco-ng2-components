import { Component } from '@angular/core';

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
    active:boolean = false;
    title:string = 'No title';

    open(title:string) {
        this.title = title;
        this.active = true;
    }

    close() {
        this.active = false;
    }
}