import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
    MetadataAdvancedPropertiesComponent,
    MetadataCommentsComponent,
    MetadataDetailsComponent,
    MetadataTagsComponent
} from './components/metadata-components';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'ng2-alfresco-metadata',
    templateUrl: './ng2-alfresco-metadata.component.html',
    styleUrls: [
        './ng2-alfresco-metadata.component.css',
        './ng2-alfresco-metadata.mdl-card.css',
        './ng2-alfresco-metadata.mdl-list.css'
    ],
    directives: [
        MetadataAdvancedPropertiesComponent,
        MetadataCommentsComponent,
        MetadataDetailsComponent,
        MetadataTagsComponent
    ]
})
export class Ng2AlfrescoMetadataComponent {
    @Input()
    node: Observable<any>;
    // could import "MinimalNodeEntity" from "documentlist" component

    loaded: boolean = false;

    constructor() {
    }
}

export * from './components/metadata-components';
