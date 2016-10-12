import { Component, Input, ElementRef } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-accordion',
    templateUrl: './metadata-accordion.component.html',
    styleUrls: ['./metadata-accordion.component.css']
})
export class MetadataAccordionComponent {
    @Input()
    expanded: boolean = false;
    
    constructor() {
    }

    expand(): void {

    }

    collapse(): void {

    }
}