import { Component, Input, EventEmitter, Output } from '@angular/core';

import {
    MetadataDetailsEditComponent
} from './metadata-details-edit.component';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-details',
    templateUrl: './metadata-details.component.html',
    styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    @Output()
    onEdit = new EventEmitter();

    editDetails() {
      this.onEdit.emit({
          node: this.node,
          component: MetadataDetailsEditComponent
      });
    }
}
