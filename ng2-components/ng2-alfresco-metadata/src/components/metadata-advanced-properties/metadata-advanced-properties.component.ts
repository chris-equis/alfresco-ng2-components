import { Component, Input } from '@angular/core';

import {
  MetadataAccordionComponent
} from './metadata-accordion/metadata-accordion.component';

import {
  MetadataAccordionItemComponent
} from './metadata-accordion/metadata-accordion-item.component';

import {
    EditPanelService
} from '../metadata-edit-panel/metadata-edit-panel.service';

import {
    MetadataAdvancedPropertiesEdit
} from './metadata-advanced-properties-edit.component';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-advanced-properties',
    templateUrl: './metadata-advanced-properties.component.html',
    // styleUrls: ['./metadata-advanced-properties.component.css'],
    directives: [
      MetadataAccordionComponent,
      MetadataAccordionItemComponent
    ]
})
export class MetadataAdvancedPropertiesComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component
    
    // Mock used for advanced properties
    advancedPropertiesMock = [{
      title: 'Dublin Core',
      properties: [{
        label: 'Publisher', value: ''
      }, {
        label: 'Contributor', value: ''
      }, {
        label: 'Type', value: ''
      }]
    }, {
      title: 'Efectivity',
      properties: [{
        label: 'Property 1', value: 'Value 1'
      }]
    }, {
      title: 'Geographic',
      properties: [{
        label: 'Property 2', value: ''
      }]
    }];

    constructor(private panel: EditPanelService) {
    }

    edit() {
       let panel = this.panel.open(
           {
               component: MetadataAdvancedPropertiesEdit,
               data: {},
               options: {
                 title: 'Edit advanced properties'
               }
           })

        panel.result.then(
            (res) => console.log('close'),
            (res) => console.log('dismissed')
        );
    }
}
