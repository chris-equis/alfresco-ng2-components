import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';

import {
    MetadataDetailsEditComponent
} from './metadata-details-edit.component';

import {
  MetadataDetailsService
} from './metadata-details.service'

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-details',
    templateUrl: './metadata-details.component.html',
    styleUrls: ['./metadata-details.component.css'],
    providers: [MetadataDetailsService]
})
export class MetadataDetailsComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    @Output()
    onEdit = new EventEmitter();

    details: Object = {};
    loading:boolean = false;

    constructor(private metadataDetailsService: MetadataDetailsService) {

    }

    editDetails() {
        this.onEdit.emit({
            node: this.node,
            component: MetadataDetailsEditComponent
        });
    }

    loadDetails() {
        this.loading = true;

        this
            .metadataDetailsService
            .getNode(this.node.id)
            .finally(() => {
                this.loading = false;
            })
            .subscribe((result:any) => {
                this.details = result.entry;
            }, error => {
                this.details = {}
            });
    }

    ngOnChanges(changes) {
        const node = changes.node.currentValue;

        if(node) {
            this.node = node;
            this.loadDetails();
        }
    }
}
