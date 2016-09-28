import { Component, Input, OnInit } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-details',
    templateUrl: './metadata-details.component.html',
    styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {
    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
      
    }

    ngOnInit() {
      console.log(this.node);
    }
}
