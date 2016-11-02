
import {describe, expect, it, inject} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {Ng2AlfrescoPanelComponent} from '../src/ng2-alfresco-panel.component';

describe('Basic Example test ng2-alfresco-panel', () => {
  it('Test hello world', inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(Ng2AlfrescoPanelComponent)
      .then((fixture) => {
        let element = fixture.nativeElement;
        expect(element.querySelector('h1')).toBeDefined();
        expect(element.getElementsByTagName('h1')[0].innerHTML).toEqual('Hello World Angular 2 ng2-alfresco-panel');
      });
  }));
});
