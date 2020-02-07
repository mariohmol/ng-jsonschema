import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ng-jsonschema-main',
    templateUrl: './main.component.html',
    providers: []
})
export class MainJsonSchemaComponent {
    @Input()
    entity;

}
