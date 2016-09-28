import { Component, Input, ViewChild } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'metadata-details',
    templateUrl: './metadata-details.component.html',
    styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent {
    @ViewChild('dialog')
    dialog: any;

    @Input()
    node: any;
    // could import "MinimalNodeEntity" from "documentlist" component

    constructor() {
        console.log('constructed');
    }

    public openDialog() {
        if (this.dialog) {
            this.dialog.nativeElement.showModal();
        }
    }

    public save() {
        alert('saved! :D');
        this.cancel();
    }

     public cancel() {
        if (this.dialog) {
            this.dialog.nativeElement.close();
        }
    }
}
