import { Component, Input } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-tags',
    templateUrl: './metadata-tags.component.html'//,
    // styleUrls: ['./metadata-tags.component.css']
})
export class MetadataTagsComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
        console.log('constructed');
    }
}