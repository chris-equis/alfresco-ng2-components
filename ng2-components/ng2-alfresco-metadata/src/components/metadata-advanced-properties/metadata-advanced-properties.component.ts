import { Component, Input } from '@angular/core';

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
    templateUrl: './metadata-advanced-properties.component.html'// ,
    // styleUrls: ['./metadata-advanced-properties.component.css']
})
export class MetadataAdvancedPropertiesComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor(private panel: EditPanelService,) {
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
