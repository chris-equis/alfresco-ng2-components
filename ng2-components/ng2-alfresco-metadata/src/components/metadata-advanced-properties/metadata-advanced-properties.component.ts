import { Component, Input } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-advanced-properties',
    templateUrl: './metadata-advanced-properties.component.html'// ,
    // styleUrls: ['./metadata-advanced-properties.component.css']
})
export class MetadataAdvancedPropertiesComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
    }
}
