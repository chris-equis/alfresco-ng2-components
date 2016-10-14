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

    details: any = {};
    loading:boolean = false;
    favorite: any = {};

    constructor(
        private panel: EditPanelService,
        private metadataDetailsService: MetadataDetailsService) {
    }

    edit() {
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
      this.toggle()
        .subscribe((res) => {
          this.favorite = res || {};
        });
    }

    loadDetails() {
        this.loading = true;

        const nodeEntry = this.metadataDetailsService.getNode(this.node.id);
        const favoriteEntry = nodeEntry.flatMap((data: any) => {
            return this.metadataDetailsService.getFavorites(data.entry);
        });

        Observable
          .combineLatest(
              nodeEntry, favoriteEntry,
              (node: any, favorite: any) => ({ node, favorite })
          ).subscribe(response => {
              this.details = response.node.entry;
              this.favorite = response.favorite || {};
          }, error => {
              this.details = {};
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

    private toggle() {
      if(this.favorite.entry) {
        return this.metadataDetailsService.removeFavorite(this.favorite);
      } else {
        return this.metadataDetailsService.addFavorite(this.node);
      }
    }
}
