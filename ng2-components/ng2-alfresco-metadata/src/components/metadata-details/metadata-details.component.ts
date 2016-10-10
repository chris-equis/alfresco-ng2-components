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
} from './metadata-details.service';

import {
    EditPanelService
} from '../metadata-edit-panel/metadata-edit-panel.service';

import {
    Details
} from './metadata-details.model';

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

    details: Details;
    loading:boolean = false;

    constructor(
        private panel: EditPanelService,
        private metadataDetailsService: MetadataDetailsService) {
    }

    editDetails() {
       let panel = this.panel.open(
           {
               component: MetadataDetailsEditComponent,
               data: this.details,
               options: {
                 title: 'Edit details'
               }
           })

        panel.result.then(
            (res) => this.updateNode(res),
            (res) => console.log('dismissed')
        );
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
                this.details = new Details(result.entry);
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

    private updateNode(data) {
        this
            .metadataDetailsService
            .updateNode(this.node.id, this.details.properties(data))
            .subscribe((details: any) => {
                this.details  = new Details(details.entry);
            });
    }
}
