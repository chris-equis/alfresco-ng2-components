import {
    Component,
    ComponentResolver,
    ViewContainerRef,
    ComponentFactory,
    ViewChild,
    Injector,
    ReflectiveInjector
} from '@angular/core';

import { PanelService,  PanelInstance} from './ng2-alfresco-panel.service';
import { PanelRef } from './panel-reference';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'ng2-alfresco-panel',
    templateUrl: './ng2-alfresco-panel.component.html',
    styleUrls: ['./ng2-alfresco-panel.component.css']
})
export class Ng2AlfrescoPanelComponent {
    @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

    active: boolean = false;

    constructor(
        private resolver: ComponentResolver,
        private panelService: PanelService
    ) {
         panelService.registerContainer(this);
    }

    open(config)  {
        const panelRef: PanelRef = new PanelRef();
        const panelInstance: PanelInstance = new PanelInstance();
        const injector = this.content.parentInjector;
        const serviceProvider = [{provide: PanelInstance, useValue: panelInstance}];
        const service: Injector = ReflectiveInjector.resolveAndCreate(serviceProvider, injector);

        if (this.active) return panelRef;

        this.resolver
            .resolveComponent(config.component)
            .then((factory: ComponentFactory<any>) => {
              const componentRef = this.content.createComponent(factory, 0, service);

              panelInstance.data = Object.assign({}, config.data);
              panelInstance.close = (result: any) => { panelRef.close(result); this.terminate(componentRef)};
              panelInstance.dismiss = (reason: any) => { panelRef.dismiss(reason); this.terminate(componentRef)}
          });

        this.active = true;
        return panelRef;
    }

    private terminate(componentRef) {
        this.active = false;
        componentRef.destroy();
    }
}
