import { Component, Input, OnInit } from '@angular/core';
import { MetadataService } from '../ng2-alfresco-metadata.service';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-tags',
    templateUrl: './metadata-tags.component.html',
    styleUrls: ['./metadata-tags.component.css'],
    providers: [ MetadataService ]
})
export class MetadataTagsComponent implements OnInit {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    tags: string[] = [];
    loading: boolean = false;
    editing: boolean = false;

    constructor(
        private metadata: MetadataService
    ) {
        
    }

    get commaSeparatedTags() {
        return this.tags.join(', ');
    }

    set commaSeparatedTags(value:string) {
        this.tags = value.split(',')
            .map((tag:string):string => tag.trim())
            .filter((tag:string):boolean => !!tag);
    }

    ngOnInit() {
        this.loading = true;

        this
            .metadata
            .getNodeTags(this.node.id)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:Object) => {
                // this.tags = result.list.entries;
                this.tags = ['Design', 'Flow chart', 'Activiti'];
            }, error => {
                this.tags = [];
            })
    }
}