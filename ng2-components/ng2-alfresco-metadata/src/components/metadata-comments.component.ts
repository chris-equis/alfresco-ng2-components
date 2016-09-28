import { Component, Input, OnInit } from '@angular/core';
import { MetadataService } from '../ng2-alfresco-metadata.service';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-comments',
    templateUrl: './metadata-comments.component.html',
    styleUrls: [ './metadata-comments.component.css' ],
    providers: [ MetadataService ]
})
export class MetadataCommentsComponent implements OnInit {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    comments: Object[];
    loading: boolean;
    content: string;

    constructor(
        private metadata: MetadataService
    ) {
        this.loading = true;
        this.comments = [];
        this.comment = '';
    }

    ngOnInit() {
        this.loading = true;

        this
            .metadata
            .getNodeComments(this.node.id)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:Object) => {
                this.comments = result.list.entries;
                console.log(this.comments);
            }, error => {
                this.comments = [];
            })
    }

    addComment() {
        this.ngOnInit();
    }

    resetComment() {
        this.comment = '';
    }
}