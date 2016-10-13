import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {
    MetadataDetailsEditComponent
} from './metadata-details-edit.component';

import {
  MetadataDetailsService
} from './metadata-details.service';

import {
    EditPanelService
} from '../metadata-edit-panel/metadata-edit-panel.service';

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
    favorite: any = {};

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

    toggleFavorite() {
      let callAPI: Observable<Object>;

      if(this.favorite.entry) {
        callAPI = this.metadataDetailsService.removeFavorite(this.favorite);
      } else {
        callAPI = this.metadataDetailsService.addFavorite(this.node);
      }

      callAPI
        .subscribe((res) => {
          this.favorite = res || {};
        });
    }

    loadDetails() {
        this.loading = true;

        Observable
          .forkJoin([
              this.metadataDetailsService.getNode(this.node.id),
              this.metadataDetailsService.getFavorites(this.node)
           ])
          .subscribe(data => {
              this.details = data[0].entry
              this.favorite = (data[1] || {});
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
            .updateNode(this.node.id, data.properties)
            .subscribe((details: any) => {
                this.details = details.entry;
            });
    }
}
