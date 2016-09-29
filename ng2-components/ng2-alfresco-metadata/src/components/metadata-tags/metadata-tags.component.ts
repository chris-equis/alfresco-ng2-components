import { Component, Input, OnChanges } from '@angular/core';
import { MetadataTagService } from './metadata-tags.service';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-tags',
    templateUrl: './metadata-tags.component.html',
    styleUrls: ['./metadata-tags.component.css'],
    providers: [ MetadataTagService ]
})
export class MetadataTagsComponent implements OnChanges {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    tags:string[] = [];
    loading:boolean = false;
    editing:boolean = false;

    constructor(
        private metadata: MetadataTagService
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

    loadTags() {
        this.loading = true;

        this
            .metadata
            .getNodeTags(this.node.id)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:any) => {
                this.tags = result.list.entries;
            }, error => {
                this.tags = [];
            })
    }

    ngOnChanges(changes) {
        const node = changes.node.currentValue;

        if(node) {
            this.node = node;
            this.loadTags();
        }
    }
}
