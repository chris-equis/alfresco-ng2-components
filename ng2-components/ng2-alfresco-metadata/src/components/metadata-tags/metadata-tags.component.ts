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
    newTagValue:string = '';

    constructor(
        private MetadataTagService: MetadataTagService
    ) {

    }

    loadTags() {
        this.loading = true;

        this
            .MetadataTagService
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

    addTag() {
        if (this.newTagValue) {
            this.loading = true;
            this.MetadataTagService.addTag(this.node.id, this.newTagValue)
                .finally(() => {
                    this.loading = false;
                    this.newTagValue = '';
                })
                .subscribe((result:any) => {
                    this.loadTags();
                }, error => {});
        }
    }

    removeTag(tagId: string) {
        this.loading = true;
        this.MetadataTagService.removeTag(this.node.id, tagId)
            .finally(() => {
                this.loading = false;
            })
            .subscribe(() => this.loadTags(), error => {});
    }

    startEditing() {
        this.editing = true;
    }

    cancelEditing() {
        this.editing = false;
    }

    ngOnChanges(changes) {
        const node = changes.node.currentValue;

        if(node) {
            this.node = node;
            this.loadTags();
        }
    }
}
