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

    saveComment() {
        this.loading = true;

        this
            .metadata
            .addComment(this.node.id, this.comment)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:any) => {
                this.comments.push(result);
                this.clearComment();
            }, error => {

            })
    }

    clearComment() {
        this.comment = '';
    }
}
