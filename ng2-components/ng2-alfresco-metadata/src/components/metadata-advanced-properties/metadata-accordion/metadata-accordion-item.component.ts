import { Component, Input, ElementRef } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-accordion-item',
    templateUrl: './metadata-accordion-item.component.html',
    styleUrls: ['./metadata-accordion-item.component.css']
})
export class MetadataAccordionItemComponent {
    @Input()
    expanded: boolean = false;
    
    constructor() {
    }

    expand(): void {

    }

    collapse(): void {

    }
}