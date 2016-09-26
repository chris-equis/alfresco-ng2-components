import { Component, Input } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-comments',
    templateUrl: './metadata-comments.component.html'//,
    // styleUrls: ['./metadata-comments.component.css']
})
export class MetadataCommentsComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
        console.log('constructed');
    }
}