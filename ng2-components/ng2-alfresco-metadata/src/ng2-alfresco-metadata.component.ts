import { Component, ViewChild } from '@angular/core';

import {
    EditPanelService
} from './components/metadata-edit-panel/metadata-edit-panel.service';

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
    ],
    providers: [EditPanelService]
})
export class Ng2AlfrescoMetadataComponent {
    @ViewChild('editPanel')
    editPanel: MetadataEditPanelComponent;

    node: any = null;

    get isActive(): boolean {
        return !!this.node;
    }

    open(node: any) {
        this.node = node;
    }

    close() {
        this.node = null;
    }

    openEditPanel(e) {
        // this.editPanel.open(e.node.name, e.component);
    }
}

export * from './components/metadata-components';
