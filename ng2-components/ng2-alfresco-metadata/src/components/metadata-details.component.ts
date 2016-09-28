import { Component, Input } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-details',
    templateUrl: './metadata-details.component.html',
    styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
        console.log('constructed');
    }
}