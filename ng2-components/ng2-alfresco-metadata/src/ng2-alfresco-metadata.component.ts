import { Component, Input, OnInit, OnChanges, Injectable } from '@angular/core';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';
import { Observable } from 'rxjs/Rx';

import {
    MetadataAdvancedPropertiesComponent,
    MetadataCommentsComponent,
    MetadataDetailsComponent,
    MetadataTagsComponent
} from './components/metadata-components';

import {
    MetadataService
} from './ng2-alfresco-metadata.service';

console.log(MetadataCommentsComponent);

declare let __moduleName: string;

@Injectable()
@Component({
    moduleId: __moduleName,
    selector: 'ng2-alfresco-metadata',
    templateUrl: './ng2-alfresco-metadata.component.html',
    styleUrls: ['./ng2-alfresco-metadata.component.css'],
    directives: [
        MetadataAdvancedPropertiesComponent,
        MetadataCommentsComponent,
        MetadataDetailsComponent,
        MetadataTagsComponent
    ],
    providers: [
        MetadataService
    ]
})
export class Ng2AlfrescoMetadataComponent implements OnInit, OnChanges {
    @Input()
    nodeEntry: Observable<any>;
    // could import "MinimalNodeEntity" from "documentlist" component

    loaded: boolean = false;

    constructor(private metadataService: MetadataService) {
        console.log('Is it me?', this);
    }

    ngOnInit() {
        console.log('should init');
    }

    ngOnChanges(changes) {

    }

    get hasNode(): boolean {
        return !!this.nodeEntry;
    }

    get visible(): boolean {
        return this.hasNode;
    }
}
