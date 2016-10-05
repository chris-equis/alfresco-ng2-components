import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
    MetadataAdvancedPropertiesComponent,
    MetadataCommentsComponent,
    MetadataDetailsComponent,
    MetadataTagsComponent,
    MetadataEditPanelComponent
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
        MetadataTagsComponent,
        MetadataEditPanelComponent
    ]
})
export class Ng2AlfrescoMetadataComponent {
    @ViewChild('editPanel')
    editPanel: MetadataEditPanelComponent;

    node: any = null;

    get isActive():boolean {
        return !!this.node;
    }

    open(node: any) {
        this.node = node;
    }

    close() {
        this.node = null;
    }

    openEditPanel() {
        this.editPanel.open('The title of the panel!!!');
    }
}

export * from './components/metadata-components';
