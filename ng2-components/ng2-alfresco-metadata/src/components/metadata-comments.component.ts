import { Component, Input, OnInit } from '@angular/core';
import { MetadataCommentService } from '../services/metadata-comment-service';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-comments',
    templateUrl: './metadata-comments.component.html',
    styleUrls: [ './metadata-comments.component.css' ],
    providers: [ MetadataCommentService ]
})
export class MetadataCommentsComponent implements OnInit {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    comments:any[] = [];
    comment:string = '';
    loading:boolean = false;
    
    constructor(
        private metadata: MetadataCommentService
    ) {}

    ngOnInit() {
        this.loading = true;

        this
            .metadata
            .getNodeComments(this.node.id)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:any) => {
                this.comments = result.list.entries;
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
